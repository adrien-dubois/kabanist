import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import authApi from "../../Api/authApi";

interface IProps {
    email: string;
    password: string;
}

const initialValue = {
    email: '',
    password: ''
}

const Login = () => {

    const [formDatas, setFormDatas] = useState<IProps>(initialValue);

    const [isShown, setIsShown] = useState<boolean>(false);
    const form = useRef<any>(null);

    const navigate = useNavigate();

    const [isError, setIsError] = useState<boolean>(false);
    const [isToken, setIsToken] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormDatas({
            ...formDatas,
            [e.target.name]: e.target.value
        })
        if(isError) {
            setIsError(false);
        }
        if(isToken){
            setIsToken(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res: any = await authApi.login(formDatas);
            localStorage.setItem('token', res.token);
            navigate('/');
        }    
        catch(err: any){
            const errors = err.data.errors;
            if(errors){
                errors.forEach((e: any) => {
                    if(e.param === 'email' ){
                        setIsError(true)
                    }
                    if(e.param === 'token' ){
                        setIsToken(true)
                    }
                    if(e.param === 'password' ){
                        setIsError(true)
                    }
                })
            } else {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        if(isError || isToken){
            form.current.value = ''
        }
    }, [isError, isToken])



  return (
        <>
            <h1 className="site-title">
                Kabanist
            </h1>
            <h3 className="title">Connexion</h3>
            <form 
                onSubmit={handleSubmit} 
                autoComplete="off"
            >
                <div className={ isError ? "login-error active" : "login-error"}>
                    Email et / ou mot de passe, incorrect(s)
                </div>
                <div className={ isToken ? "login-error active" : "login-error"}>
                    Merci de confirmer votre inscription, vérifiez vos emails.
                </div>
                <div className={ isError ? 'input is-error' : "input"}>
                    <span><FaUserAlt/></span> 
                    <input
                        type='email'
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={ isError ? 'input is-error' : "input"}>
                    <span><FaLock/></span> 
                    <input
                        type={ isShown ? 'text' : 'password'}
                        placeholder="Mot de passe"
                        name="password"
                        onChange={handleChange}
                        required
                        ref={form} 
                    />
                    <span onClick={() => setIsShown(!isShown)} >{ isShown ? <BsFillEyeFill/> : <BsFillEyeSlashFill/> }</span>
                </div>
                <button 
                    type="submit"
                    className="btn"
                >
                    Se connecter
                </button>  
                
                <NavLink to="/forgot-password" className="forgot">Mot de passe oublié?</NavLink>
                
                <div className="create">
                    Pas encore de compte? &nbsp;
                    <NavLink to="/register">
                            S'enregistrer.
                    </NavLink>
                </div>
            </form>
        </>
  )
}

export default Login