import { BsMoonStars, BsSun } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../..";
import boardApi from "../../../Api/boardApi";
import { setBoards } from "../../../Api/Features/boardSlice";
import Logo from '../../../ressources/img/logo.png'
import { Container, DropdownMenu } from "./Header.elements";
import DropdownItem from "./DropdownItem";
import { useEffect, useRef, useState } from "react";
import UserModal from "../UserModal/UserModal";
import { FaRobot } from "react-icons/fa";


type Props = {
  theme: string,
  themeToggler:  (() => void)
}

const Header = ({theme, themeToggler}: Props) => {

  const isDarkMode = theme === 'dark';
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false)

  const boards = useSelector((state: RootState) => state.boards.value);
  const user = useSelector((state: RootState) => state.user.value);
  const username = user.firstName + ' ' + user.lastName;

  const [activeMenu, setActiveMenu] = useState<boolean>(false)
  const handleMenu = () => setActiveMenu(!activeMenu);

  const ref = useRef<any>(null);
  const innerRef = useRef<any>(null);

//   CLOSE DROPDOWN MENU WHEN CLICK OUTSIDE
  useEffect(() => {
    const ifClickOutside = (e: any) =>{
        if(activeMenu && innerRef.current && !innerRef.current.contains(e.target) && ref.current && !ref.current.contains(e.target)){
          handleMenu();
        }
    }

    document.addEventListener('mousedown', ifClickOutside)
    return () => document.removeEventListener("mousedown", ifClickOutside)
  }, [activeMenu,handleMenu,ref])
  
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

  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
        <Container position="center">
            <nav>
                <div className="logo">
                    <img src={Logo} alt="Kabanist" width={40} />
                    <p>Kabanist</p>
                </div>

                <div className="settings">
                    <ul className="list" >

                        {/* ADD NEW PROJECT */}
                        <li 
                            className="settings__add il"
                            onClick={ addBoard }
                        >
                            +
                        </li>

                        {/* DARKMODE SWITCH */}
                        <li 
                            className="settings__darkmode il"
                            onClick={ themeToggler }
                        >
                            { isDarkMode ? <BsMoonStars/> : <BsSun/> }
                        </li>

                        {/* USER MENU */}
                        <DropdownMenu  ref={ref} >
                            <li className="settings__user il" onClick={handleMenu}>
                                <AiOutlineUser/>
                            </li>

                                <div ref={innerRef} className={ activeMenu ? "menu active" : "menu"}>
                                    <h3> { username }</h3>
                                    <ul className="menu__ul" >
                                        <DropdownItem 
                                            icon={<AiOutlineEdit/>} 
                                            text="Profil" 
                                            onClick={() => {setShowModal(true)}}
                                        />
                                        <DropdownItem
                                            icon={<FaRobot/>}
                                            text="GP-Tchat"
                                            onClick={() => {console.log('test')}}
                                        />
                                        <DropdownItem 
                                            icon={<FiLogOut/>} 
                                            text="Déconnexion"
                                            onClick={() => {handleLogout()}}
                                        />
                                    </ul>
                                </div>
                        </DropdownMenu>
                    </ul>

                </div>
                
            </nav>

        </Container>

        <UserModal
            showModal={showModal}
            setShowModal={setShowModal}
        />
    </>
  
)
  
}

export default Header