import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Fade } from 'react-awesome-reveal';

const Instructors = () => {
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, refetch, data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await axiosSecure('/instructors');
            return res.data;
        },
    });

    if (isLoading) {
        return <span>Loading...</span>
    }


    return (
        <div>
            <h3 className='text-center text-2xl font-semibold'>Total instructors: {instructors.length}</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2 mx-auto'>
                {
                    instructors.map(instractor => <div className="card w-full lg:w-96 bg-base-100 shadow-xl" key={instractor._id}>
                        <Fade cascade>
                            <figure className='relative h-52'>
                                <img src={instractor.image} alt="Class" />
                            </figure>
                        </Fade>
                        <div className="card-body">
                            <h2 className="card-title">{instractor.name}</h2>
                            <p>Email : {instractor.Email}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;
