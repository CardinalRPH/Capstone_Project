import { createBrowserRouter } from "react-router-dom";

import LnSuLayout from "../pages/layout/LnSuLayout";
import Forget_Layout from "../pages/layout/ForgetPwLayout";
import Dash_Layout from "../pages/layout/DashboardLayout"

import Login_pg from "../pages/Login";
import Signup_pg from "../pages/SignUp";
import ForgetPw_pg from "../pages/Forget_pw";
import ForgetPwSend_pg from "../pages/Forget_pw_scs";
import Dashboard_pg from "../pages/Dashboard";
import Calendar_pg from "../pages/Calendar";
import Cuaca_pg from "../pages/Cuaca";
import Tips_pg from "../pages/Tips";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LnSuLayout>
            <Login_pg />
        </LnSuLayout>
    },
    {
        path: '/sign-up',
        element: <LnSuLayout>
            <Signup_pg />
        </LnSuLayout>
    },
    {
        path: '/forget-password',
        element: <Forget_Layout>
            <ForgetPw_pg />
        </Forget_Layout>
    },
    {
        path: '/forget-send',
        element: <Forget_Layout>
            <ForgetPwSend_pg />
        </Forget_Layout>
    },
    {
        path: '/dashboard',
        element: <Dash_Layout>
            <Dashboard_pg />
        </Dash_Layout>
    },
    {
        path: '/calendar',
        element: <Dash_Layout>
            <Calendar_pg />
        </Dash_Layout>
    },
    {
        path: '/cuaca',
        element: <Dash_Layout>
            <Cuaca_pg />
        </Dash_Layout>
    },
    {
        path: '/tips',
        element: <Dash_Layout>
            <Tips_pg />
        </Dash_Layout>
    }
]);


export default router;
