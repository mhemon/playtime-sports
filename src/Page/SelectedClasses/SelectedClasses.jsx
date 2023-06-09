import React from 'react';
import useCart from '../../hook/useCart';
import { AiTwotoneDelete } from "react-icons/ai";
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const SelectedClasses = () => {
    const [cart, refetch] = useCart()
    const [axiosSecure] = useAxiosSecure()
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0)
    const handleCartDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${item._id}`)
                    .then(res => {
                        console.log('res from delete', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            <h3 className='text-2xl font-semibold mb-2'>Total Selected Classes : {cart.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-base-200'>
                        <tr>
                            <th>#</th>
                            <th>Class Images</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {/* provide index number */}
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>$ {item.price}</td>
                                <th>
                                    <button onClick={() => handleCartDelete(item)} className="btn btn-square">
                                        <AiTwotoneDelete size='1.9em' className='text-red-600' />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
            <div className={`text-center mt-4 ${!totalPrice && 'hidden'}`}>
                <Link to='/dashboard/payment'><button className='w-[200px] btn my-custom-btn'>Pay: ${totalPrice}</button></Link>
            </div>
        </div>
    );
};

export default SelectedClasses;