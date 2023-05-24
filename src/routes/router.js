import { createBrowserRouter } from "react-router-dom";

import LnSuLayout from "../pages/layout/LnSuLayout";
import Forget_Layout from "../pages/layout/ForgetPwLayout";

import Login_pg from "../pages/Login";
import Signup_pg from "../pages/SignUp";
import ForgetPw_pg from "../pages/Forget_pw";
import ForgetPwSend_pg from "../pages/Forget_pw_scs";

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
    }
]);


export default router;
