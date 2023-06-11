import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import useAuth from '../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import formatDate from '../../utils/DateFormat';

const PaymentHistory = () => {
    const { user, theme } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {isLoading,data: payment=[]} = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/payments-history?email=${user?.email}`)
            return res.data
        }
    })

    if(isLoading){
        return <Loading/>
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold mb-2'>Total Payment : {payment.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-base-200'}`}>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Class Name (List)</th>
                            <th>Total Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map((item, index) => <tr key={item._id}>
                                <th>
                                    {/* provide index number */}
                                    {index + 1}
                                </th>
                                <td>
                                    {item.transactionId}
                                </td>
                                <td>
                                    <ul style={{listStyle: 'square'}}>{item.classNames.map((name,index) => <li key={index}>{name}</li>)}</ul>
                                </td>
                               
                                <td>$ {item.price}</td>
                                <td>
                                    {formatDate(item.date)}
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;