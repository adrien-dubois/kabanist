import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import { router } from "./utils/Routes";


function App() {
  return (
    <>
      <GlobalStyle/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
