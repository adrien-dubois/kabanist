import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FaLock, FaRegEnvelope, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BsShieldFillCheck } from 'react-icons/bs'
import { useToasts } from "../../hooks/Toasts/ToastContext";
import authApi from "../../Api/authApi";


interface IProps {
  firstName: string;
  lastName: string
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {

    const [formDatas, setFormDatas] = useState<IProps>(initialValue);

    const [isShown, setIsShown] = useState<boolean>(false);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);
    const [errorUsername, setErrorUsername] = useState<boolean>(false);
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { pushToast } = useToasts();
    const navigate = useNavigate();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setFormDatas({
          ...formDatas,
          [e.target.name]: e.target.value
      })
      if(isError ) {
          setIsError(false);
          setErrorUsername(false);
          setErrorPassword(false);
          setErrorMessage('');
      }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(formDatas.password === formDatas.confirmPassword){
        try{
            await authApi.signup(formDatas);
            pushToast({
                title: "Inscription",
                content: "Inscription effectuée, un email vous a été envoyé afin de confirmer votre inscription."
            })
            navigate('/');
        }    
        catch(err: any){
            const errors = err.data.errors;
            errors.forEach((e: any) => {
                if(e.param === 'email' ){
                    setErrorMessage(e.msg);
                    setIsError(true)
                    setErrorUsername(true)
                }
                if(e.param === 'password' ){
                    setErrorMessage(e.msg);
                    setIsError(true);
                    setErrorPassword(true);
                }
            })
        }
      } else {
        setIsError(true);
        setErrorPassword(true);
        setErrorMessage('Les mots de passes ne correspondent pas');
      }
    }

  return (
    <>
        <h1 className="site-title">
            Kabanist
        </h1>
      
        <h3 className="title">Inscription</h3>
        <form 
            onSubmit={handleSubmit} 
            autoComplete="off"
        >
            <div className={ isError ? "login-error active" : "login-error"}>
                { errorMessage }
            </div>
            
            <div className="input">
                <span><FaUserAlt/></span> 
                <input
                    type='text'
                    placeholder="Nom"
                    name="firstName"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input">
                <span><FaUserEdit/></span> 
                <input
                    type='text'
                    placeholder="Prénom"
                    name="lastName"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={ errorUsername ? "input is-error" : "input"}>
                <span><FaRegEnvelope/></span> 
                <input
                    type='email'
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={ errorPassword ? 'input is-error' : "input"}>
                <span><FaLock/></span> 
                <input
                    type={ isShown ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    name="password"
                    onChange={handleChange}
                    required
                />
                <span onClick={() => setIsShown(!isShown)} >{ isShown ? <BsFillEyeFill/> : <BsFillEyeSlashFill/> }</span>
            </div>

            <div className={ errorPassword ? 'input is-error' : "input"}>
                <span><BsShieldFillCheck/></span> 
                <input
                    type={ isConfirm ? 'text' : 'password'}
                    placeholder="Confirmation du mot de passe"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                />
                <span onClick={() => setIsConfirm(!isConfirm)} >{ isConfirm ? <BsFillEyeFill/> : <BsFillEyeSlashFill/> }</span>
            </div>
            <button 
                type="submit"
                className="btn"
            >
                Envoyer
            </button>
            
            <div className="create">
            Déjà inscrit? &nbsp;
            <NavLink to="/login">
                Se connecter.
            </NavLink>
            </div>
        </form>

    </>
  )
}

export default Register