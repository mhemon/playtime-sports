import React from 'react';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ClassCard from '../Shared/ClassCard/ClassCard';

const EnrolledClasses = () => {
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {data: enrolledClass = [], isLoading} = useQuery({
        queryKey: ['enrolled-classes', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure(`/enrolled-classes?email=${user?.email}`)
            return res.data
        }
    })

    if(isLoading){
        return <p>Loading....</p>
    }
   
    return (
        <div>
            <ClassCard data={enrolledClass} />
        </div>
    );
};

export default EnrolledClasses;