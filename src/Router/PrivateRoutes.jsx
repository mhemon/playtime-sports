import React from 'react';
import useAuth from '../hook/useAuth';
import Loading from '../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    
    if(loading){
        return <Loading/>
    }
    if(user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;