import { Outlet } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { darkTheme, lightTheme } from "../../GlobalStyles"
import { useDarkMode } from "../../utils/DarkTheme/useDarkMode"
import Header from "../Common/Header/Header"
import Sidebar from "../Common/Sidebar/Sidebar"
import { Container, Div } from "./Layout.elements"

const Layout = () => {

  const [theme, themeToggler, mountedComponents] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if(!mountedComponents) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
      <Container>
          <Header theme={theme} themeToggler={themeToggler} />

          <Div>
            <Sidebar />
            <Outlet/>
          </Div>
          
      </Container>
    </ThemeProvider>
  )
}

export default Layout