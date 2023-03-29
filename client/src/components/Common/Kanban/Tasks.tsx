import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import { Draggable } from "react-beautiful-dnd"
import { Card } from "./Tasks.elements"
import { ITask } from '../../../utils/types';

type Props = {
    tasks: ITask[],
    selectedTaskSetter: React.Dispatch<any>,
}

const Tasks = ({tasks, selectedTaskSetter}: Props ) => {

  return (
    <>
        {
            tasks.map((task, index) => (
                <Draggable key={task!.id} draggableId={task!.id} index={index}>
                    {(provided, snapshot) => (
                        <NaturalDragAnimation
                            style={provided.draggableProps.style}
                            snapshot={snapshot}
                        >
                            { style => (
                                <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    { ...provided.dragHandleProps}
                                    style={style}
                                    onClick={ () => selectedTaskSetter(task) }
                                >
                                 <span>
                                     { 
                                         task!.title === '' ? 
                                         'Sans titre' : task!.title 
                                     }
                                 </span>
                             </Card>
                            )}
                        </NaturalDragAnimation>
                    )}
                </Draggable>
            ))
        }
    </>
  )
}

export default Tasks