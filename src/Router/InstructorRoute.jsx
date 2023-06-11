import React from 'react';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useInstructor from '../hook/useInstructor';
import Loading from '../Components/Loading/Loading';

const InstructorRoute = ({ children }) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    const [isInstructor, isInstructorLoading] = useInstructor()

    if(loading || isInstructorLoading){
        return <Loading/>
    }

    if(user && isInstructor){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace/>
    );
};

export default InstructorRoute;