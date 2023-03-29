import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { BoardsT } from '../../utils/types';
import { AppDispatch } from '../../index';
import { useDispatch } from 'react-redux';
import boardApi from '../../Api/boardApi';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { NavLink } from 'react-router-dom';

type Props = {
    boards : BoardsT[],
    setBoards: ActionCreatorWithPayload<any, "board/setBoards">,
    boardId: string | undefined,
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
    activeIndex: number
}

const Projects = ({ boards, setBoards, boardId, setActiveIndex, activeIndex }: Props ) => {

    const dispatch: AppDispatch = useDispatch();

    // Méthode permettant de mettre à jour la position des projets dans la DB
    const onDragEnd = async({ source, destination }: any) => {
        const newList = [...boards];
        const [removed] = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, removed);

        const activeItem = newList.findIndex(e => e.id === boardId);
        setActiveIndex(activeItem);
        dispatch(setBoards(newList));

        try {
            await boardApi.updatePosition({ boards: newList })
        } catch (err) {
            alert(err)
        }
    }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
            <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'} >
                { (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} >
                        {
                            boards.map((item: any, idx: any) => (
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
  )
}

export default Projects