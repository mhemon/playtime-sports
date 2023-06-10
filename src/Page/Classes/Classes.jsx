import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { Fade } from 'react-awesome-reveal';
import useCart from '../../hook/useCart';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import useEnrolled from '../../hook/useEnrolled';
import Loading from '../../Components/Loading/Loading';
import useAdmin from '../../hook/useAdmin';
import useInstructor from '../../hook/useInstructor';

const Classes = () => {
    const [axiosSecure] = useAxiosSecure()
    const [cart, refetch] = useCart()
    const [enrolledClass] = useEnrolled()
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const navigate = useNavigate()
    const {user, theme} = useAuth()
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure('/classes')
            return res.data
        }
    })

    if(isLoading){
        return <Loading/>
    }
    
    const cartID = cart.map(item => item.classItemID)
    const enrolID = enrolledClass.map(item => item.classItemID)
    const flattenedEnrolID = [].concat(...enrolID);
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
                    classes.map(classItem => <div className={`card w-full lg:w-96 bg-base-100 shadow-xl overflow-hidden ${theme === 'dark' && 'bg-slate-700'} ${classItem.available_seats <= 0 && 'bg-red-500'}`} key={classItem._id}>
                        <Fade cascade>
                        <figure className='relative h-52'>
                        <div className={`badge absolute top-4 right-2 text-lg ${theme === 'light' && 'badge-secondary'}`}>${classItem.price}</div>
                            <img src={classItem.image} alt="Class" />
                            </figure>
                            </Fade>
                        <div className="card-body">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Taken By:- {classItem.instructor_name}</h2>
                            <h2 className="card-title">{classItem.name} <span className={!flattenedEnrolID.includes(classItem._id) ? 'hidden' : `${theme === 'light' ? 'badge badge-secondary' : 'badge badge-neutral'}`}>Enrolled</span></h2>
                            <p>Seat Left : {classItem.available_seats}</p>
                            <div className="card-actions justify-end">
                                <button disabled={cartID.includes(classItem._id) || flattenedEnrolID.includes(classItem._id) || isAdmin || isInstructor || classItem.available_seats <= 0} onClick={() => handleBtnClick(classItem)} className={`btn ${theme === 'light' && 'my-custom-btn'}`}>Add to Select</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Classes;