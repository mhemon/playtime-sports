import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { Fade } from 'react-awesome-reveal';

const Classes = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure('/classes')
            return res.data
        }
    })
    console.log(classes);
    return (
        <div>
            <h3 className='text-center text-2xl font-semibold'>Total Classes: {classes.length}</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2 mx-auto'>
                {
                    classes.map(classItem => <div className="card w-full lg:w-96 bg-base-100 shadow-xl" key={classItem._id}>
                        <figure className='relative h-52'>
                        <div className="badge badge-secondary absolute top-4 right-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-lg">${classItem.price}</div>
                            <img src={classItem.image} alt="Class" />
                            </figure>
                        <div className="card-body">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Taken By:- {classItem.instructor_name}</h2>
                            <h2 className="card-title">{classItem.name}</h2>
                            <p>Seat Left : {classItem.available_seats}</p>
                            <Fade cascade>
                            <div className="card-actions justify-end">
                                <button className="btn my-custom-btn">Add to Select</button>
                            </div>
                            </Fade>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Classes;