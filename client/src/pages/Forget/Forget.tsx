import { useState } from "react"
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa"
import { NavLink } from 'react-router-dom';

const Forget = () => {
    
    const [isError, setIsError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    const handleSubmit = () => {

    }

    const handleChange = () => {
        
    }

  return (
    <>
      <h3 className="title">Mot de passe oublié ?</h3>
        <form 
            onSubmit={handleSubmit} 
            autoComplete="off"
        >
          <div className="explain">
            Veuillez renseigner l'adresse email avec laquelle vous êtes inscrit(e).
          </div>
            <div className={ isError ? "login-error active" : "login-error"}>
                Cet email n'est pas enregistré dans notre base de donnée utilisateur.
            </div>
            <div className={ isError ? 'input is-error' : "input"}>
                <span><FaRegEnvelope/></span> 
                <input
                    type='email'
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                />
            </div>
            <button 
                type="submit"
                className="btn"
            >
                Envoyer
            </button>
            
            <NavLink to="/login" className="forgot"><FaArrowLeft/> &nbsp; Retour à la page de connexion</NavLink>
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

export default Forget