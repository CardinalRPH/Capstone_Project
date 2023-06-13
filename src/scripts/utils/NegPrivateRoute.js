import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NegPrivateRoute = ({ children }) => {


    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        isAuthenticated && navigate("/dashboard")
    }, [isAuthenticated, navigate])

    return <>{children}</>
};

export default NegPrivateRoute;