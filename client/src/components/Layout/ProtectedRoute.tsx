import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Layout from "./Layout";
import { AppDispatch } from '../../index';
import { useDispatch } from "react-redux";
import Loading from "../Common/Loading/Loading";
import { setUser } from "../../Api/Features/userSlice";

const ProtectedRoute = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const checkAuth = async () => {
        const user = await authUtils.isAuthenticated();
        if(!user) {
          navigate('/login');
        } else {
          dispatch(setUser(user))
          setLoading(false);
        }
      }
  
      checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate])

  return loading ?  <Loading/>  : <Layout/>

}

export default ProtectedRoute