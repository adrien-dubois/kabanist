import { Sections } from "../../../pages/Board/Board.elements";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";
import { Box } from "./Kanban.elements";
import sectionApi from "../../../Api/sectionApi";
import TitleSection from "./TitleSection";
import { useModal } from "../../../hooks/Modal/ModalContext";
import Tasks from "./Tasks";
import taskApi from "../../../Api/taskApi";
import TaskModal from "../TaskModal/TaskModal";
import { ITask } from '../../../utils/types';

type Props = {
    datas: any[],
    boardId: string | undefined
}

let timer: any;
const timeout = 500;

const Kanban = ({datas, boardId}: Props) => {

    const [data, setData] = useState<any[]>([]);
    const { modal } = useModal();
    const [selectedTask, setSelectedTask] = useState<ITask>(undefined);

    useEffect(() => {
        setData(datas)
    }, [datas])

    const onDragEnd = async ({source, destination}: any) => {
        if(!destination) return;
        const sourceColumnIdx = data.findIndex((e:any) => e.id === source.droppableId);
        const destinationColumnIdx = data.findIndex((e: any) => e.id === destination.droppableId);
        const sourceCol = data[sourceColumnIdx];
        const destinationCol = data[destinationColumnIdx];

        const sourceSectionId = sourceCol.id;
        const destinationSectionId = destinationCol.id;

        const sourceTasks = [...sourceCol.tasks];
        const destinationTasks = [...destinationCol.tasks];

        if(source.droppableId !== destination.droppableId){
            const [removed] = sourceTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removed);
            data[sourceColumnIdx].tasks = sourceTasks;
            data[destinationColumnIdx].tasks = destinationTasks
        }else {
            const [removed] = destinationTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removed);
            data[destinationColumnIdx].tasks = destinationTasks
        }

        try {
            await taskApi.updatePosition(boardId, {
                resourceList: sourceTasks,
                destinationList: destinationTasks,
                resourceSectionId: sourceSectionId,
                destinationSectionId: destinationSectionId
            });
            setData(data)
        } catch (err) {
            alert(err)
        }
    }

    const createSection = async () => {
        try {
            const section = await sectionApi.create(boardId);
            setData([...data, section])
        } catch (err) {
            alert(err)
        }
    }

    const updateSectionTitle = async (e: React.ChangeEvent<HTMLInputElement>, sectionId: string | undefined) => {
        clearTimeout(timer);
        const newTitle = e.target.value;
        const newData = [...data];
        const index = newData.findIndex((e: any) => e.id === sectionId);
        newData[index].title = newTitle;
        setData(newData);
        timer = setTimeout(async () => {
            try {
                await sectionApi.update(boardId, sectionId, { title: newTitle })
            } catch (err) {
                alert(err)
            }
        }, timeout)
    }

    const deleteSection = async ( sectionId: string | undefined ) => {
        if(await modal({
            title: 'Supprimer la section',
            content: "Êtes-vous sûr(e) de vouloir supprimer cette section?"
        })){
            try {
                await sectionApi.delete(boardId, sectionId);
                const newData = [...data].filter((e: any) => e.id !== sectionId)
                setData(newData)
            } catch (err) {
                alert(err)
            }
        }
    }

    const createTask = async (sectionId: string | undefined) => {
        try {
            const task = await taskApi.create(boardId, { sectionId });
            const newData = [...data];
            const index = newData.findIndex((e: any) => e.id === sectionId);
            newData[index].tasks.unshift(task);
            setData(newData);
        } catch (err) {
            alert(err)
        }
    }

    const onUpdateTask = (task: ITask) => {
        const newData = [...data];
        const sectionIndex = newData.findIndex((e: any) => e.id === task?.section.id);
        const taskIndex = newData[sectionIndex].tasks.findIndex((e: any) => e.id === task?.id);
        newData[sectionIndex].tasks[taskIndex] = task
        setData(newData);
    }

    const onDeleteTask = (task: ITask) => {
        const newData = [...data];
        const sectionIndex = newData.findIndex((e: any) => e.id === task?.section.id);
        const taskIndex = newData[sectionIndex].tasks.findIndex((e: any) => e.id === task?.id);
        newData[sectionIndex].tasks.splice(taskIndex, 1);
        setData(newData);
    }

    

  return (
    <>
        <Sections>
            <div className="sections__box">
            <span 
                className="sections__box__btn"
                onClick={createSection}
            >
                Ajouter une section
            </span>
            <span className="sections__box__quantity">
                {data.length} Sections
            </span>
            </div>
        </Sections>

        <DragDropContext onDragEnd={onDragEnd}>
            <Box>
                {
                    data.map(section => (
                        <div 
                            className="kanban"
                            key={section.id}
                        >
                            <Droppable 
                                key={section.id} 
                                droppableId={section.id} 
                            >
                                {(provided) => (
                                    <div 
                                        className="kanban__droppable"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="kanban__droppable__child">

                                            <TitleSection
                                                value={section.title}
                                                placeholder="Sans titre"
                                                addAction={ () => createTask(section.id)}
                                                delAction={ () => deleteSection(section.id) }
                                                updateTitle={ (e:React.ChangeEvent<HTMLInputElement>) => updateSectionTitle(e, section.id) }
                                            />

                                        </div>

                                        < Tasks tasks={section.tasks} selectedTaskSetter={setSelectedTask} />

                                        { provided.placeholder }
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))
                }
            </Box>
        </DragDropContext>

        <TaskModal
            selectedTask={selectedTask}
            boardId={boardId}
            closeModal={() => setSelectedTask(undefined)}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
        />
    </>
  )
}

export default Kanban