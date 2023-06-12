import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';
import useAuth from '../../hook/useAuth';
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';



const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure()
    const { theme } = useAuth()

    const { data: pendingClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-classes'],
        queryFn: async () => {
            const res = await axiosSecure('/all-classes')
            return res.data
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleApprove = (classItem) => {
        axiosSecure.patch(`/classes-approved/${classItem._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class Status Update Successful!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDeny = (classItem) => {
        axiosSecure.patch(`/classes-denied/${classItem._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class Status Update Successful!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleFeedback = (classItem) => {
        Swal.fire({
            title: 'Submit your Feedback',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (feedbackText) => {
                const url = `https://playtime-sports-server.vercel.app/add-feedback/${classItem._id}`;

                return axiosSecure.patch(url, { feedback: feedbackText })
                    .then(res => {
                        return res.data;
                    })
                    .catch(error => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                refetch()
                Swal.fire({
                    title: 'Feedback Submitted',
                    text: 'Thank you for your feedback!',
                    icon: 'success'
                });
            }
        });
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {
                pendingClasses.map(classItem => <div className={`card w-full lg:w-96 bg-base-100 shadow-xl overflow-hidden ${theme === 'dark' && 'bg-slate-700'}`} key={classItem._id}>
                    <Fade cascade>
                        <figure className='relative h-52'>
                            <div className={`badge absolute top-4 right-2 text-lg ${theme === 'light' && 'badge-secondary'}`}>${classItem.price}</div>
                            <img src={classItem.image} alt="Class" />
                        </figure>
                    </Fade>
                    <div className="card-body">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Instructor Name:- {classItem.instructor_name} <br /> Email: {classItem.email}</h2>
                        <h2 className="card-title">Class Name: {classItem.name}</h2>
                        <p>Available Seat : {classItem.available_seats}</p>
                        <p>Status : {classItem.status}</p>
                        <div className="card-actions justify-end">
                            <button disabled={classItem.status === 'approved' || classItem.status === 'denied'} onClick={() => handleApprove(classItem)} className="btn btn-sm my-custom-btn">Approve</button>
                            <button disabled={classItem.status === 'approved' || classItem.status === 'denied'} onClick={() => handleDeny(classItem)} className="btn btn-sm my-custom-btn">Denied</button>
                            <button disabled={classItem.status !== 'denied'} onClick={() => handleFeedback(classItem)} className="btn btn-sm my-custom-btn">Send feedback</button>
                            {classItem.feedback.length > 0 && <div className='w-full'>
                                <p className='text-center text-lg font-semibold mt-3'>FeedBack</p>
                                <div className="divider"></div> 
                                <div className="chat chat-start">
                                    <div className="chat-bubble">{classItem.feedback}</div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ManageClasses;