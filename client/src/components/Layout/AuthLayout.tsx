import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Div } from "../../pages/Login/Login.elements"
import Logo from '../../ressources/img/logo-dark.png';
import authUtils from "../../utils/authUtils";
import Loading from "../Common/Loading/Loading";

const AuthLayout = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if(!isAuth) {
        setLoading(false);
      }
       else {
        navigate('/');
      }
    }

    checkAuth();
  }, [navigate])

  return (

    loading ? (
      <Loading/>
    ) : (
    <Div>
        <div className="container">
            
            <div className="design">
                <div className="pill-1 rotate-45"></div>
                <div className="pill-2 rotate-45"></div>
                <div className="pill-3 rotate-45"></div>
                <div className="pill-4 rotate-45"></div>
            </div>

            <div className="login">
              <img src={Logo} alt="Logo todo"/>

                <Outlet/>

            </div>
        </div>
    </Div>
  ))
}

export default AuthLayout