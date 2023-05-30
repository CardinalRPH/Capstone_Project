import { Navigate, createBrowserRouter, Route } from "react-router-dom"

import PrivateRoute from "../utils/PrivateRoute";

import LnSuLayout from "../views/layout/LnSuLayout";
import Forget_Layout from "../views/layout/ForgetPwLayout";
import Dash_Layout from "../views/layout/DashboardLayout"

import Login_pg from "../views/pages/Login";
import Signup_pg from "../views/pages/SignUp";
import ForgetPw_pg from "../views/pages/Forget_pw";
import ForgetPwSend_pg from "../views/pages/Forget_pw_scs";
import Dashboard_pg from "../views/pages/Dashboard";
import Calendar_pg from "../views/pages/Calendar";
import Cuaca_pg from "../views/pages/Cuaca";
import Tips_pg from "../views/pages/Tips";

const AppRouter = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Navigate to="/login" replace />
    // },
    // {
    //     path: "/home",
    //     element: <LandingPage />
    // },
    {
        path: '/i',
        element: <LnSuLayout />,
        children: [
            {
                path: "login",
                element: <Login_pg />
            }, {
                path: "sign-up",
                element: <Signup_pg />
            }
        ]

    },
    {
        path: '/forget-password',
        element: <Forget_Layout />,
        children: [
            {
                path: '',
                element: <ForgetPw_pg />
            }, {
                path: 'sended',
                element: <ForgetPwSend_pg />
            }
        ]
    },

    //dashboard loged
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <Dash_Layout />
            </PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: <Dashboard_pg />
            },
            {
                path: 'calendar',
                element: <Calendar_pg />
            }, {
                path: 'cuaca',
                element: <Cuaca_pg />
            }, {
                path: 'tips',
                element: <Tips_pg />
            }
        ]
    }
]);

export default AppRouter;
