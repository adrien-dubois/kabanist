import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../../Api";
import Loading from "../../components/Common/Loading/Loading";
import checked from '../../ressources/img/verify.png';

const EmailVerify = () => {

    const navigate = useNavigate();
    const [validUrl, setValidUrl] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true)
    const { id, token } = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const { data } = await API.get(`${process.env.REACT_APP_API}/auth/${id}/verify/${token}`);
                setLoading(false)
                console.log(data)
                setValidUrl(true)
            } catch (err) {
                console.log(err);
                setLoading(false)
                setValidUrl(false);
            }
        }

        verifyEmailUrl();
    }, [id, token]);

  return (

    loading ? (
        <Loading/>
    ) : (
    <>
        <h1 className="site-title">
            Kabanist
        </h1>

        { validUrl ? (

            <>
                <img src={checked} alt='Verfied logo' className="logo-checked" />

                <span className="confirmed" >
                    Inscription confirmée, vous pouvez vous connecter dès maintenant.
                </span>

                <button
                className="backBtn"
                onClick={
                    () => navigate('/')
                }
                >
                    Connexion
                </button>

            </>

        ) : (
            // IF NO VALID TOKEN / VALID URL
            <>
                <h3 className="title-error">
                    Erreur 404
                </h3>
                <span className="qcq" >
                    La page demandée n'existe pas.
                </span>

                <button
                className="backBtn"
                onClick={
                    () => navigate('/')
                }
                >
                    Retour
                </button>
            </>
        ) }

    </>)
  )
}

export default EmailVerify