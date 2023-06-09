import React from 'react';
import useCart from '../../hook/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutFrom from './CheckoutFrom';

const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum , 0)
    const price = parseFloat(total.toFixed(2))
    const stripePromise = loadStripe(import.meta.env.VITE_PK);
    return (
        <div>
           <Elements stripe={stripePromise}>
            <CheckoutFrom cart={cart} price={price}></CheckoutFrom>
            </Elements> 
        </div>
    );
};

export default Payment;