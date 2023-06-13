import { Navigate, createBrowserRouter, Route } from "react-router-dom"
import { Helmet } from "react-helmet";

import PrivateRoute from "../utils/PrivateRoute";
import NegPrivateRoute from "../utils/NegPrivateRoute";
import ADXPrivateRoute from "../utils/ADXPrivateRoute";

import LnSuLayout from "../views/layout/LnSuLayout";
import Forget_Layout from "../views/layout/ForgetPwLayout";
import Dash_Layout from "../views/layout/DashboardLayout"

import Login_pg from "../views/pages/Login";
import Signup_pg from "../views/pages/SignUp";
import ForgetPw_pg from "../views/pages/Forget_pw";
import ForgetPwSend_pg from "../views/pages/Forget_pw_scs";
import Dashboard_pg from "../views/pages/Dashboard";
import Calendar_pg from "../views/pages/Calendar";
import Article_pg from "../views/pages/Article";
import Tips_pg from "../views/pages/Tips";
import Profile_pg from "../views/pages/Profile";
import History_pg from "../views/pages/History";

import PageNotFound from "../views/pages/PageNotFound";

import ADXLnSuLayout from "../views/layout/Editor/ADXLnSuLayout";
import ADXDashboardLayout from "../views/layout/Editor/ADXDashboardLayout";

import ADXLogin_pg from "../views/pages/Editor/ADXLogin";
import ADXDashboard_pg from "../views/pages/Editor/ADXDashboard";
import ADXUsers_pg from "../views/pages/Editor/ADXUsers";
import ADXPlants_pg from "../views/pages/Editor/ADXPlants";
import ADXArticle from "../views/pages/Editor/ADXArticle";
import ADXContent from "../views/pages/Editor/ADXContent1";

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
        element: (
            <NegPrivateRoute>
                <Forget_Layout />
            </NegPrivateRoute>),
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
            <PrivateRoute>
                <Dash_Layout />
            </PrivateRoute>
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
                path: 'Article/:id',
                element: (<><Helmet>
                    <title>Article</title>
                </Helmet><Article_pg /></>)
            }, {
                path: 'tips',
                element: (<><Helmet>
                    <title>Tips</title>
                </Helmet><Tips_pg /></>)
            }, {
                path: 'history',
                element: (<><Helmet>
                    <title>History</title>
                </Helmet><History_pg /></>)
            }, {
                path: 'profile',
                element: (<><Helmet>
                    <title>Profile</title>
                </Helmet><Profile_pg /></>)
            }
        ]
    },

    //Editor
    {
        path: '/e',
        element: <ADXLnSuLayout />,
        children: [
            {
                path: "login",
                element: (<><Helmet>
                    <title>Editor Login</title>
                </Helmet><ADXLogin_pg /></>)
            }
        ]

    },

    {
        path: '/e/dashboard',
        element: (
            // <ADXPrivateRoute>
            <ADXDashboardLayout />
            //</ADXPrivateRoute>
        ),
        children: [
            {
                path: '',
                element: (<><Helmet>
                    <title>Dashboard</title>
                </Helmet><ADXDashboard_pg /></>)
            },
            {
                path: 'users',
                element: (<><Helmet>
                    <title>Users</title>
                </Helmet><ADXUsers_pg /></>)
            }, {
                path: 'content',
                element: (<><Helmet>
                    <title>Article</title>
                </Helmet><ADXContent/></>)
            }, {
                path: 'plants',
                element: (<><Helmet>
                    <title>Plants</title>
                </Helmet><ADXPlants_pg /></>)
            }, {
                path: 'profile',
                element: (<><Helmet>
                    <title>Profile</title>
                </Helmet><Profile_pg /></>)
            },{
                path: 'article/:id',
                element: (<><Helmet>
                    <title>Article</title>
                </Helmet><ADXArticle/></>)
            }
        ]
    },
    {
        path: '/404NOTFOUND',
        element: <PageNotFound />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);

export default AppRouter;
