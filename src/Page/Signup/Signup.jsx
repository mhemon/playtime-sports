import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Lottie from "lottie-react";
import loginAnimation from "../../assets/anim/login.json";
import useAuth from '../../hook/useAuth';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { BallTriangle } from 'react-loader-spinner'
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import Loading from '../../Components/Loading/Loading';

const Signup = () => {
    const { createUser } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password');
    const [showpass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <Loading/>
    }
    const onSubmit = data => {
        setLoading(true)
        const email = data.email
        const password = data.password
        const name = data.name || 'anonymous'
        const photoURL = data.photoURL || 'https://i.ibb.co/9T2XqZ3/user-1.png'
        createUser(email, password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL
                })
                    .then(() => {
                        // user create and name update success
                        const updateUser = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL
                        }
                        fetch('https://playtime-sports-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(updateUser)
                        })
                            .then(res => res.json())
                            .then(() => {
                                setLoading(false)
                                Swal.fire({
                                    title: 'Account Created!',
                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp'
                                    }
                                })
                                navigate('/')
                            })
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
                <title>PlayTime Sports | Signup</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center hidden md:block md:w-1/2 max-w-lg">
                        <Lottie animationData={loginAnimation} loop={true} />;
                    </div>
                    <div className="card flex md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-[10px]">
                            <h3 className='text-3xl text-center font-semibold'>Please Signup</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="input input-bordered" {...register("name")} />
                            </div>
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
                                    <input name='password' type={showpass ? 'text' : 'password'} placeholder="password" className="input input-bordered w-full" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/ })} />
                                    <span className='-ml-8'>{showpass ? <AiFillEyeInvisible onClick={() => setShowPass(!showpass)} title='hide password' /> : <AiFillEye onClick={() => setShowPass(!showpass)} title='show password' />}</span>
                                </div>
                                {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must have a captial Letter and a special char</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Password Length Must be 6</span>}
                            </div>
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input type={showpass ? 'text' : 'password'} placeholder="confirm password" className="input input-bordered w-full" {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === password || "Passwords do not match" // Add custom validation rule
                                    })} />
                                    <span className='-ml-8'>{showpass ? <AiFillEyeInvisible onClick={() => setShowPass(!showpass)} title='hide password' /> : <AiFillEye onClick={() => setShowPass(!showpass)} title='show password' />}</span>
                                </div>
                                {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL" className="input input-bordered" {...register("photoURL")} />
                            </div>
                            <div className="form-control">
                                <button type='submit' className="btn my-custom-btn">Signup</button>
                            </div>
                            <Link to='/login'><p className='text-center'>Alreday have an account? Login</p></Link>
                        </form>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;