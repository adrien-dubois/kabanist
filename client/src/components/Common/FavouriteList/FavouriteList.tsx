import { useEffect, useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import boardApi from "../../../Api/boardApi";
import { setFavouriteList } from "../../../Api/Features/favouriteSlice";
import { AppDispatch, RootState } from '../../../index';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { NavLink } from "react-router-dom";


const FavouriteList = () => {

    const dispatch: AppDispatch = useDispatch();
    const list = useSelector((state: RootState) => state.favourites.value);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { boardId } = useParams();

    useEffect(() => {
        const getBoards = async () => {
            try {
                const res: any = await boardApi.favourites();
                dispatch(setFavouriteList(res))
            } catch (err) {
                alert(err);
            }
        }

        getBoards();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const index = list.findIndex((e: any) => e.id === boardId);
        setActiveIndex(index);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, boardId])

    const onDragEnd = async({ source, destination }: any) => {
        const newList = [...list];
        const [removed] = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, removed);

        const activeItem = newList.findIndex((e: any) => e.id === boardId);
        setActiveIndex(activeItem);
        dispatch(setFavouriteList(newList));

        try {
            await boardApi.updateFavouritePosition({ boards: newList })
        } catch (err) {
            alert(err)
        }
    }

  return (
    <>
        <li>
            <div>
                <span>
                    <BsFillBookmarkStarFill />
                </span>
                <span>Favoris</span>
            </div>
        </li>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'} >
                { (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} >
                        {
                            list.map((item: any, idx: any) => (
                                <Draggable 
                                    key={item._id} 
                                    draggableId={item._id}
                                    index={idx}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            draggable={true}
                                            
                                            className={idx === activeIndex ? 'active sidebar__project'
                                            : 'sidebar__project'}
                                        >
                                            <NavLink to={`/${item.id}`}>
                                                <span className="sidebar__dot">•</span>
                                                <span className="sidebar__project-name"> {item.icon} {item.title}</span>
                                            </NavLink>
                                        </li>
                                    )}
                                </Draggable>
                            ))
                        }
                        { provided.placeholder }
                    </div>
                ) }
            </Droppable>
        </DragDropContext>
    </>
  )
}

export default FavouriteList