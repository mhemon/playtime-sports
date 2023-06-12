import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Fade } from 'react-awesome-reveal';
import Loading from '../../Components/Loading/Loading';
import useAuth from '../../hook/useAuth';

const Instructors = () => {
    const {theme} = useAuth()
    // const [instructors, setInstructors] = useState([])
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await axiosSecure('/instructors');
            return res.data;
        },
    });

    // useEffect(() => {
    //     fetch('https://playtime-sports-server.vercel.app/instructors')
    //     .then(res => res.json())
    //     .then(data => {
    //         setInstructors(data)
    //     })
    // }, [])

    if (isLoading) {
        return <Loading/>
    }


    return (
        <div>
            <h3 className='text-center text-2xl font-semibold'>Total instructors: {instructors.length}</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2 mx-auto'>
                {
                    instructors.map(instractor => <div className={`card w-full lg:w-72 bg-base-100 shadow-xl overflow-hidden border-2 ${theme === 'dark' && 'bg-slate-700'}`} key={instractor._id}>
                        <Fade cascade>
                            <figure className='relative h-52 mt-2'>
                                <img className='border-l-8 border-b-8 border-orange-300 rounded-lg' src={instractor.image} alt="Class" />
                            </figure>
                        </Fade>
                        <div className="card-body">
                            <h2 className="card-title">{instractor.name}</h2>
                            <p>Email : {instractor.email}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;
