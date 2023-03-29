import { useCallback, useEffect, useRef } from "react"
import { FaRegEdit, FaTimes, FaUserAlt } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Background, Div } from "./UserModal.elements"
import { RootState } from '../../../index';
import { BiEditAlt } from 'react-icons/bi';

type Props = {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const UserModal = ({
  showModal,
  setShowModal
}:Props) => {

  
  const user = useSelector((state: RootState) => state.user.value);

  const modalRef = useRef<any>(null);

  const closeWindow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(modalRef.current === e.target){
      setShowModal(false);
    }
}

const keyPress = useCallback((e: any) => {
    if(e.key === 'Escape' && showModal){
      setShowModal(false);
    }
  }, [setShowModal, showModal])

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress)
  })

  return (
    <>
    { showModal ? (

      <Background
        ref={modalRef}
        onClick={closeWindow}
      >
        <Div>
          <div className="close">
            <FaTimes/>
          </div>

          <div className="user">
            <div className="user__icon">
              <FaUserAlt/>
            </div>
            <span className="user__title">
              <h2>À Propos</h2>
            </span>

          </div>

          <table className="user-table">
              <tbody>
                  <tr>
                      <td>Nom</td>
                      <td> { user.firstName } </td>
                  </tr>
                  <tr>
                      <td>Prénom</td>
                      <td>{ user.lastName }</td>
                  </tr>
                  <tr>
                      <td>Email</td>
                      <td>{ user.email }</td>
                  </tr>
                  <tr>
                      <td>Mot de passe</td>
                      <td className="user-table__password" >******* <FaRegEdit/> </td>
                  </tr>

              </tbody>
          </table>

        </Div>
      </Background>
    ) : null}
    </>
  )
}

export default UserModal