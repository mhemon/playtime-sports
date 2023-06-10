import React from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hook/useAuth';
import Loading from '../../Components/Loading/Loading';
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

const MyClasses = () => {
    const {user, theme} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {data: myClasses = [], isLoading} = useQuery({
        queryKey: ['added-classes', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure(`/myclass?email=${user?.email}`)
            return res.data
        }
    })
    if(isLoading){
        return <Loading/>
    }
    const updateBtn = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: `update will'be added soon...`,
            showConfirmButton: false,
            timer: 1500
          })
    }
    return (
        <div>
            <h3 className='text-2xl font-semibold mb-2'>Total Added Classes: {myClasses.length}</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            {
                myClasses.map(classItem => <div className={`card w-full lg:w-96 bg-base-100 shadow-xl overflow-hidden ${theme === 'dark' && 'bg-slate-700'}`} key={classItem._id}>
                <Fade cascade>
                <figure className='relative h-52'>
                <div className={`badge absolute top-4 right-2 text-lg ${theme === 'light' && 'badge-secondary'}`}>${classItem.price}</div>
                    <img src={classItem.image} alt="Class" />
                    </figure>
                    </Fade>
                <div className="card-body">
                <h2 className="tracking-widest text-xs title-font font-medium mb-1">Status:- {classItem.status}</h2>
                <h3 className='text-base font-semibold'>{classItem.name}</h3>
                    <p>Enrolled : {classItem.enrolled}</p>
                    {classItem.feedback.length > 0 && <div className='w-full'>
                                <p className='text-center text-lg font-semibold'>FeedBack</p>
                                <div className="divider"></div> 
                                <div className="chat chat-end">
                                    <div className="chat-bubble">{classItem.feedback}</div>
                                </div>
                            </div>}
                    <button onClick={() => updateBtn()} className='btn my-custom-btn'>Update</button>
                </div>
            </div>)
            }
            </div>
        </div>
    );
};

export default MyClasses;