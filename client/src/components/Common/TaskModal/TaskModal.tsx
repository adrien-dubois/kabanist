import { Background, Div } from "./TaskModal.elements"
import { ITask } from '../../../utils/types';
import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Moment from "moment";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'
import taskApi from "../../../Api/taskApi";
import { useModal } from "../../../hooks/Modal/ModalContext";

type Props = {
    selectedTask: ITask,
    boardId: string | undefined,
    closeModal: () => void,
    onUpdate: (task: ITask) => void,
    onDelete: (task: ITask) => void,
}

let timer: any;
const timeout = 500

const TaskModal = ({ 
    selectedTask, 
    boardId, 
    closeModal, 
    onUpdate, 
    onDelete 
} : Props) => {

    const modalRef = useRef<any>(null);
    const [task, setTask] = useState(selectedTask)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [showModal, setShowModal] = useState<boolean>(false);
    const editorWrapperRef = useRef<any>(null);

    const { modal } = useModal();

    useEffect(() => {
        setTask(selectedTask);
        setTitle(selectedTask !== undefined ? selectedTask.title : '')
        setContent(selectedTask !== undefined ? selectedTask.content : '')

        if(selectedTask !== undefined){
            setShowModal(true);
            
            updateEditorHeight();
        }
    }, [selectedTask])

    const updateEditorHeight = () => {
        setTimeout(() => {
            if(editorWrapperRef.current){
                const box = editorWrapperRef.current;
                box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px';
            }
        }, timeout)
    }


    const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        const newTitle = e.target.value;
        timer = setTimeout( async () => {
            try {
                await taskApi.update(boardId, task?.id, { title: newTitle })
            } catch (err) {
                alert(err)
            }
        }, timeout)

        task!.title = newTitle;
        setTitle(newTitle);
        onUpdate(task);
    }

    const onClose = useCallback(() => {
        setShowModal(false);
        onUpdate(task);
        closeModal();
        
    }, [closeModal, onUpdate, task])

    const closeWindow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(modalRef.current === e.target){
          onClose();
        }
    }

    const keyPress = useCallback((e: any) => {
        if(e.key === 'Escape' && showModal){
          onClose()
        }
      }, [onClose, showModal])
    
      useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
      })

    const deleteTask = async() => {
        if(await modal({
            title: 'Suppression',
            content: "Êtes-vous certain(e) de vouloir supprimer cette tâche?"
        })){
            try {
                await taskApi.delete(boardId, task?.id);
                onDelete(task);
                setTask(undefined);
                onClose()
            } catch (err) {
                alert(err)
            }
        }
    }

    const updateContent = async (event: Event, editor: any) =>{
        clearTimeout(timer);
        const data = editor.getData();

        if(showModal){
            timer = setTimeout(async() => {
                try {
                    await taskApi.update(boardId, task?.id, { content: data });
                } catch (err) {
                    alert(err)
                }
            }, timeout)
        }

        task!.content = data;
        setContent(data);
        onUpdate(task);
    }

  return (
    <>
        { showModal ? (
            <Background
                ref={modalRef}
                onClick={closeWindow}
            >
                <Div >
                    <div className="delete-picto" onClick={deleteTask} >
                        <FaRegTrashAlt />
                    </div>
                    <div className="modal">
                        <input
                            value={title}
                            onChange={updateTitle}
                            placeholder="Sans titre"
                            className="title"
                        />

                        <div className="modal__task">
                            { task !== undefined ? Moment(task.createdAt).format('DD-MM-YYYY') : '' }
                        </div>
                        <span className="divider"></span>

                        <div className="modal__editor" ref={editorWrapperRef} >
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={updateContent}
                                onFocus={updateEditorHeight}
                                onBlur={updateEditorHeight}
                            />
                        </div>
                    </div>
                </Div>
            </Background>
        ): null}
    </>
  )
}

export default TaskModal