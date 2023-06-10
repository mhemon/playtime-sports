import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Lottie from "lottie-react";
import loginAnimation from "../../assets/anim/login.json";
import useAuth from '../../hook/useAuth';
import Swal from 'sweetalert2';
import { BallTriangle } from 'react-loader-spinner';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import Loading from '../../Components/Loading/Loading';

const Login = () => {
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showpass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <Loading/>
    }

    const onSubmit = data => {
        setLoading(true)
        const email = data.email
        const password = data.password
        loginUser(email, password)
        .then(() => {
            setLoading(false)
            navigate(from, { replace: true });
        })
        .catch(error => {
            setLoading(false)
            console.error(error)
            Swal.fire({
                icon: 'error',
                title: `${error.code}`,
                text: `${error.message}`
            })
        })
    };
    return (
        <div>
            <Helmet>
                <title>PlayTime Sports | Login</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center hidden md:block md:w-1/2 max-w-lg">
                        <Lottie animationData={loginAnimation} loop={true} />;
                    </div>
                    <div className="card flex md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-[10px]">
                            <h3 className='text-3xl text-center font-semibold'>Please Login</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input type={showpass ? 'text' : 'password'} placeholder="password" className="input input-bordered w-full" {...register("password", { required: true })} />
                                    <span className='-ml-8'>{showpass ? <AiFillEyeInvisible onClick={() => setShowPass(!showpass)} title='hide password' /> : <AiFillEye onClick={() => setShowPass(!showpass)} title='show password' />}</span>
                                </div>
                                {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                            </div>
                            <div className="form-control mt-2">
                                <button type='submit' className="btn my-custom-btn">Login</button>
                            </div>
                            <Link to='/signup'><p className='text-center'>Don't have an account? Signup</p></Link>
                        </form>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;