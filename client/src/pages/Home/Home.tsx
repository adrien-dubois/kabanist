
import { Div } from "../Board/Board.elements"
import { Container } from "./Home.elements"
import { AppDispatch } from '../../index';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import boardApi from '../../Api/boardApi';
import { setBoards } from "../../Api/Features/boardSlice";
import { useState } from "react";
import ButtonLoading from "../../utils/ButtonLoading";

const Home = () => {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const createBoard = async () => {
    setLoading(true);
    try {
      const res: any = await boardApi.create();
      dispatch(setBoards([res]))
      navigate(`/${res.id}`)
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Div>
      <Container>
        <ButtonLoading
          loading={loading.toString()}
          onClick={ createBoard }
          text="Cliquez pour commencer"
        />
      </Container>
    </Div>
  )
}

export default Home