import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../hook/useAuth';

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const {theme} = useAuth()
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-users'],
        queryFn: async () => {
            const res = await axiosSecure('/manage-users')
            return res.data
        }
    })
    if (isLoading) {
        return <Loading />
    }

    const updateUserToAdmin = (user) => {
        axiosSecure.patch(`update-users-admin?email=${user.email}`)
        .then(res => {
            const data = res.data
            if (data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} make admin!`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const updateUserToInstructor = (user) => {
        axiosSecure.patch(`update-users-instructor?email=${user.email}`)
        .then(res => {
            const data = res.data
            if (data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} make Instructor!`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    return (
        <div>
            <h3 className='text-2xl font-semibold mb-2'>Total Users : {users.length}</h3>
            <div className="overflow-x-auto">
                <table className='table'>
                    {/* head */}
                    <thead className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-base-200'}`}>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Instructor</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index+1}
                                </th>
                                <td>
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'instructor' ? 'Instructor' :
                                    <button disabled={user.role === 'admin'} onClick={() => updateUserToInstructor(user)} className="btn btn-ghost btn-xs">Make Instructor</button>}
                                </td>
                                <td>
                                {user.role === 'admin' ? 'Admin' :
                                <button disabled={user.role === 'instructor'} onClick={() => updateUserToAdmin(user)} className="btn btn-ghost btn-xs">Make Admin</button>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;