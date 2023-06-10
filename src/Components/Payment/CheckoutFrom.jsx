import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import './CheckoutFrom.css'
import { useNavigate } from 'react-router-dom';

const CheckoutFrom = ({ cart, price }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const { user } = useAuth()


    const [clientSecret, setClientSecret] = useState("");
    const [axiosSecure] = useAxiosSecure()


    const [processing, setProcessing] = useState(false)
    const [transaction, setTransaction] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {
            const transactionID = paymentIntent.id
            setTransaction(transactionID)
            const classItemID = cart.map(item => item.classItemID)
            const payment = {
                email: user?.email,
                transactionId: transactionID,
                price,
                date: new Date(),
                status: 'enrolled',
                cartItems: cart.map(item => item._id),
                classItemID,
                classNames: cart.map(item => item.name),
                classImage: cart.map(item => item.image),
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.insertResult && res.data.deleteResult) {
                        // TODO:please add +1 on enrolled and remove 1 from available seat
                        axiosSecure.patch('/classes-update-enroll', classItemID)
                            .then(res => {
                                if (res.data.modifiedCount > 0) {
                                    navigate('/dashboard/payment-history')
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Payment Completed Successfully!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }

                            })
                    }
                })
        }
    }


    return (
        <div className='md:w-1/2 mx-auto m-4'>
            <form onSubmit={handleSubmit} className='payment-form'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <button className='btn my-custom-btn mt-4 md:w-36 w-full' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay ${price}
                </button>

            </form>
            {cardError && <p className='text-red-600 w-2/3 mx-auto mt-4'>{cardError}</p>}
        </div>
    );
};

export default CheckoutFrom;