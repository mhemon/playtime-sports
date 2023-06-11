import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { BiConfused, BiArrowBack } from "react-icons/bi";
import Lottie from "lottie-react";
import ErrorAnimation from '../assets/anim/error-page.json'

const ErrorPage = () => {
    const { error, status } = useRouteError()
    return (
        <div className="h-full">
            <div className='flex justify-center align-center'>
                <Lottie animationData={ErrorAnimation} loop={true} />;
            </div>
            <div className='text-center'>
                <Link to='/'>
                    <button className="btn my-custom-btn text-white"> <BiArrowBack style={{ marginRight: '10px' }} /> Back to homepage</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;