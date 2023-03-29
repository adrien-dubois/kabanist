import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/Layout/AuthLayout";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import Board from "../pages/Board/Board";
import EmailVerify from "../pages/EmailVerify/EmailVerify";
import Forget from "../pages/Forget/Forget";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
    
       
            {
                path: '/',
                element: <ProtectedRoute/>,
                children: [
                    {
                        index: true,
                        element: <Home/>
                    },
                    {
                        path: '/:boardId',
                        element: <Board/>
                    }
                ]
            },
            {
                path: '/',
                element: <AuthLayout/>,
                children: [
                    {
                        path: '/login',
                        element: <Login/>
                    },
                    {
                        path: '/register',
                        element: <Register/>
                    },
                    {
                        path: '/forgot-password',
                        element: <Forget/>
                    },
                    {
                        path: '/auth/:id/verify/:token',
                        element: <EmailVerify/>
                    }
                ]
            }
        
    
])