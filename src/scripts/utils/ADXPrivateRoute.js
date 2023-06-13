import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ADXPrivateRoute = ({ children }) => {
    const { isAuthenticatedADX } = useSelector((state) => state.authADX);
    const navigate = useNavigate();


    useEffect(() => {
        !isAuthenticatedADX && navigate("/utyf")
    }, [isAuthenticatedADX, navigate])

    return <>{children}</>
};

export default ADXPrivateRoute;