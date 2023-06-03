import { Navigate, createBrowserRouter, Route } from "react-router-dom"
import { Helmet } from "react-helmet";

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
import Profile_pg from "../views/pages/Profile";

import PageNotFound from "../views/pages/PageNotFound";

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
                element: (<><Helmet>
                    <title>Login</title>
                </Helmet><Login_pg /></>)
            }, {
                path: "sign-up",
                element: (<><Helmet>
                    <title>Sign Up</title>
                </Helmet><Signup_pg /></>
                )
            }
        ]

    },
    {
        path: '/forget-password',
        element: <Forget_Layout />,
        children: [
            {
                path: '',
                element: (
                    <><Helmet>
                        <title>Forget Password</title>
                    </Helmet><ForgetPw_pg /></>
                )
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
           //<PrivateRoute>
                <Dash_Layout />
            //</PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: (<><Helmet>
                    <title>Dashboard</title>
                </Helmet><Dashboard_pg /></>)
            },
            {
                path: 'planner',
                element: (<><Helmet>
                    <title>Planner</title>
                </Helmet><Calendar_pg /></>)
            }, {
                path: 'cuaca',
                element: (<><Helmet>
                    <title>Cuaca</title>
                </Helmet><Cuaca_pg /></>)
            }, {
                path: 'tips',
                element: (<><Helmet>
                    <title>Tips</title>
                </Helmet><Tips_pg /></>)
            }, {
                path: 'profile',
                element: (<><Helmet>
                    <title>Profile</title>
                </Helmet><Profile_pg /></>)
            }
        ]
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);

export default AppRouter;
