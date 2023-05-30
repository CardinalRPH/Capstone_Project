import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {


    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        !isAuthenticated && navigate("/i/login")
    }, [isAuthenticated, navigate])

    return <>{children}</>
};

export default PrivateRoute;