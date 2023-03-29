import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AppDispatch } from "../../..";
import boardApi from "../../../Api/boardApi";
import { Wrapper } from "./Sidebar.elements"
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../../../Api/Features/boardSlice';
import { RootState } from '../../../index';
import { useNavigate, useParams } from "react-router-dom";
import Projects from "../../Projects/Projects";
import FavouriteList from "../FavouriteList/FavouriteList";

const Sidebar = () => {
  
    const dispatch : AppDispatch = useDispatch();
    const navigate = useNavigate();

    const boards = useSelector((state: RootState) => state.boards.value);
    const { boardId } = useParams();

    const [showProjects, setShowProjects] = useState<boolean>(true);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Récupération des boards et set dans le reducer Axios
    useEffect(() => {
        const getBoards = async () => {
            try {
                const res: any = await boardApi.getAll();
                dispatch(setBoards(res));
            } catch (err) {
                alert(err)
            }
        }
        getBoards();
    }, [dispatch]);

    const addBoard = async () => {
        try {
            const res: any = await boardApi.create();
            const newList = [res, ...boards];
            dispatch(setBoards(newList));
            navigate(`/${res.id}`)
        } catch (err) {
            alert(err)
        }
      }

    // Définition de l'item actif + vérification si il y a déjà une board existante afin de rediriger soit sur l'accueil, soit sur le premier projet en cours

    useEffect(() => {
        const activeItem = boards.findIndex(e => e.id === boardId);
        
        if(boards.length > 0 && boardId === undefined){
            navigate(`/${boards[0].id}`);
        }
        setActiveIndex(activeItem);
    }, [boards, boardId, navigate]);
        
  return (
    <Wrapper>
        <ul className="sidebar__top">
            <FavouriteList />
        </ul>

        <div className="sidebar__middle" >
            <div className="sidebar__middle__tab">
                <div 
                    className="projectbar" 
                    onClick={() => {setShowProjects(!showProjects);}}
                >
                    <span>
                        <FaChevronDown className={ !showProjects ? 'hidden-projects' : undefined } /> 
                    </span>
                    <h2>Projets</h2>
                </div>

                <div className="add_project" onClick={ addBoard }>
                    +
                </div>
            </div>
        </div>

    {/* List of projects with DnD */}
    <ul className="sidebar__projects">
        { 
            showProjects && 
                <Projects
                    boards={boards}
                    setBoards={setBoards}
                    boardId={boardId}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                /> 
        }
    </ul>

    </Wrapper>
  )
}

export default Sidebar