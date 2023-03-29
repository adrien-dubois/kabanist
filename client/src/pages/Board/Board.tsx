import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import boardApi from "../../Api/boardApi";
import { Box, Div, Wrapper } from "./Board.elements";
import { FaRegStar, FaRegTrashAlt, FaStar } from 'react-icons/fa';
import EmojiPicker from "../../components/Common/EmojiPicker/EmojiPicker";
import { AppDispatch, RootState } from '../../index';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from "../../Api/Features/boardSlice";
import { setFavouriteList } from "../../Api/Features/favouriteSlice";
import { useModal } from "../../hooks/Modal/ModalContext";
import Kanban from "../../components/Common/Kanban/Kanban";

let timer: any;
const timeout = 500;

const Board = () => {

  const dispatch: AppDispatch = useDispatch();
  const { boardId } = useParams();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sections, setSections] = useState<any[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('');

  const boards = useSelector((state: RootState) => state.boards.value);
  const favouriteList = useSelector((state: RootState) => state.favourites.value);
  const navigate = useNavigate();
  const { modal } = useModal();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res: any = await boardApi.getOne(boardId);

        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavourite(res.favourite);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    }
    getBoard();
  }, [boardId])
  

  // UPDATE ICON
  const onIconChange = async (newIcon: any) => {
    let temp = [...boards];
    const index = temp.findIndex(e => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon};

    if(isFavourite){
      let tempFavourite: any = [...favouriteList];
      const favouriteIndex = tempFavourite.findIndex((e: any) => e.id === boardId);
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], icon: newIcon};
      dispatch(setFavouriteList(tempFavourite));
    }

    setIcon(newIcon);
    dispatch(setBoards(temp));
    try {
      await boardApi.update(boardId, { icon: newIcon })
    } catch (err) {
      alert(err);
    }
  }

  // UPDATE TITLE
  const updateTitle = async(e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex(e => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle};

    if(isFavourite){
      let tempFavourite: any = [...favouriteList];
      const favouriteIndex = tempFavourite.findIndex((e: any) => e.id === boardId);
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], title: newTitle};
      dispatch(setFavouriteList(tempFavourite));
    }

    dispatch(setBoards(temp));
    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { title: newTitle })
      } catch (err) {
        alert(err);
      }
    }, timeout)
  }

  // UPDATE DESCRIPTION
  const updateDescription = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async() => {
      try {
        await boardApi.update(boardId, { description: newDescription })
      } catch (err) {
        alert(err);
      }
    }, timeout)
  }

  // ADD FAVOURITE
  const addFavourite = async() => {
    try {
      const board =  await boardApi.update(boardId, { favourite: !isFavourite });
      let newFavList: any = [...favouriteList]
      if(isFavourite){
        newFavList = newFavList.filter((e: any) => e.id !== boardId)
      } else {
        newFavList.unshift(board)
      }
      dispatch(setFavouriteList(newFavList));
      setIsFavourite(!isFavourite);
    } catch (err) {
      alert(err)
    }
  }

  // DELETE BOARD

  const deleteBoard = async() => {
    if(await modal({
      title: 'Suppression',
      content: `Êtes-vous certain de vouloir supprimer ${title} ?`
    })){

      try {
        await boardApi.delete(boardId)
        if(isFavourite){
          const newFavList = favouriteList.filter((e: any) => e.id !== boardId)
          dispatch(setFavouriteList(newFavList));
        }
  
        const newList =  boards.filter((e: any) => e.id !== boardId)
        if(newList.length === 0) {
          navigate('/');           
        } else {
          navigate(`/${newList[0].id}`)
        }
        dispatch(setBoards(newList));
      } catch (err) {
        alert(err)
      }
    }
  }

  return (
    <Div>
      <Box>
        <span className="fav-icon" onClick={ addFavourite } >
          {
            isFavourite ? (
              <FaStar color="#F5C500"/>
            ) : (
              <FaRegStar/>
            )
          }
        </span>
        <span className="del-icon" onClick={deleteBoard}>
          <FaRegTrashAlt color="#F43B47" />
        </span>
      </Box>

      <Wrapper>
        <div className="emoji">
          <EmojiPicker icon={icon} onChange={onIconChange} />
        </div>
        <input
          value={title}
          onChange={updateTitle}
          placeholder="Sans titre"
          className="title"
        />
        <textarea
          onChange={updateDescription}
          className="description"
          value={description}
        ></textarea>

      </Wrapper>

      <Kanban 
        datas={sections}
        boardId={boardId}
      />


    </Div>
  )
}

export default Board