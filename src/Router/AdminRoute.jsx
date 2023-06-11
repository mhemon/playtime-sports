import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import useAdmin from '../hook/useAdmin';
import Loading from '../Components/Loading/Loading';

const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    const [isAdmin, isAdminLoading] = useAdmin()

    if(loading || isAdminLoading){
        return <Loading/>
    }

    if(user && isAdmin){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace/>
    );
};

export default AdminRoute;