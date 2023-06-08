import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { Fade } from 'react-awesome-reveal';
import useCart from '../../hook/useCart';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hook/useAuth';

const Classes = () => {
    const [axiosSecure] = useAxiosSecure()
    const [cart, refetch] = useCart()
    const navigate = useNavigate()
    const {user} = useAuth()
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure('/classes')
            return res.data
        }
    })
    
    const cartID = cart.map(item => item.classItemID)
    const handleBtnClick = (item) => {
        if(user && user.email){
            const classItem =  { classItemID: item._id, name: item.name, image: item.image, price: item.price, email: user.email }
            axiosSecure.post('/carts', classItem)
            .then(res => {
                if (res.data.insertedId) {
                    refetch() //refetch to disable select btn
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class selected Success!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }else{
            Swal.fire({
                title: 'Please login to selecting the courses',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (
        <div>
            <h3 className='text-center text-2xl font-semibold'>Total Classes: {classes.length}</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 p-2 mx-auto'>
                {
                    classes.map(classItem => <div className="card w-full lg:w-96 bg-base-100 shadow-xl overflow-hidden" key={classItem._id}>
                        <Fade cascade>
                        <figure className='relative h-52'>
                        <div className="badge badge-secondary absolute top-4 right-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-lg">${classItem.price}</div>
                            <img src={classItem.image} alt="Class" />
                            </figure>
                            </Fade>
                        <div className="card-body">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Taken By:- {classItem.instructor_name}</h2>
                            <h2 className="card-title">{classItem.name}</h2>
                            <p>Seat Left : {classItem.available_seats}</p>
                            <div className="card-actions justify-end">
                                <button disabled={cartID.includes(classItem._id)} onClick={() => handleBtnClick(classItem)} className="btn my-custom-btn">Add to Select</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Classes;