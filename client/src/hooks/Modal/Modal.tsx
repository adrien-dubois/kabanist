import { useCallback, useEffect, useRef } from "react";
import { Container, Background } from "./Modal.elements"

type Props = {
  title?: string;
  content?: string;
  showModal?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({
  title, 
  content, 
  onCancel, 
  showModal, 
  onConfirm
}: Props) => {

  const modalRef = useRef<any>(null);

  const closeWindow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(modalRef.current === e.target){
      onCancel();
    }
  }

  const keyPress = useCallback((e: any) => {
    if(e.key === 'Escape' && showModal){
      onCancel()
    }
  }, [onCancel, showModal])

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress)
  })

  return ( 
  <>
    { showModal ?(
    <Background 
      ref={ modalRef } 
      onClick={ closeWindow }
    >
        <Container  showModal={showModal}>
          
          {/* CLOSE MODAL */}
          <div className="modal-close-button">
            <button
              onClick={() => onCancel()}
            >
              X
            </button>
          </div>

          {/* TITLE */}
          <div className="modal-title">
            <h2> { title ?? 'Confirmation' } </h2>
          </div>

          {/* BODY WITH CONTENT */}
          <div className="modal-body">
            <p> { content ?? 'Voulez vous vraiment effectuer cette action ?' } </p>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="modal-footer">
            <button
              id="cancel-btn"
              
              onClick={() => {
                onCancel();
              }}
            >
              Annuler
            </button>

            <button
              onClick={() => onConfirm() }
            >
              OK
            </button>
          </div>
        </Container>
    </Background> ): null
    }
  </>)
}

export default Modal;