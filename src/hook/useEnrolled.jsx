import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEnrolled = () => {
    const {user, loading} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {refetch,data: enrolledClass = [], isLoading} = useQuery({
        queryKey: ['enrolled-classes', user?.email],
        enabled: !loading,
        queryFn: async () =>{
            const res = await axiosSecure(`/enrolled-classes?email=${user?.email}`)
            return res.data
        }
    })
    return [enrolledClass, refetch, isLoading]
};

export default useEnrolled;