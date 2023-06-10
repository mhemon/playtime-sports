import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';
const ImageHostingToken = import.meta.env.VITE_Image_Upload_Token
const AddClasses = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const ImageHostingURL = `https://api.imgbb.com/1/upload?key=${ImageHostingToken}`

    if(loading){
        return <Loading/>
    }
    
    const onSubmit = data => {
        setLoading(true)
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(ImageHostingURL, {
            method : 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(ImgResponse => {
            if(ImgResponse.success){
                const ImgURL = ImgResponse.data.display_url
                const {name, available_seats, price} = data
                const newClass = {name, available_seats: parseInt(available_seats), email: user?.email, instructor_name: user?.displayName, image: ImgURL, price: parseFloat(price), status: "pending", enrolled: 0, feedback: ""}
                // console.log(newItem);
                axiosSecure.post('/classes', newClass)
                .then(res => {
                    setLoading(false)
                    console.log(res);
                    if(res.data.insertedId){
                        reset()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Class added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
        .catch(error => {
            setLoading(false)
            console.log(error);
        })
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Add Classes</title>
            </Helmet>
           
            <div className="card max-w-lg shadow-2xl bg-base-100 mx-auto">
            <h3 className='text-2xl font-semibold mb-2 text-center pt-4'>Add a New Class</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class name</span>
                        </label>
                        <input type="text" placeholder="Class name" className="input input-bordered" {...register("name", { required: true })} />
                        {errors.name && <span className='text-red-600'>Class name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Pick Class Images</span>
                        </label>
                        <input type="file" placeholder="Class name" className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                        {errors.image && <span className='text-red-600'>please select an images.</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instructor Name</span>
                        </label>
                        <input type="text" placeholder="Instructor name" className="input input-bordered" {...register("instructor_name")} defaultValue={user?.displayName} disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email")} defaultValue={user?.email} disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Available seats</span>
                        </label>
                        <input type="number" placeholder="Available seats" className="input input-bordered" {...register("available_seats", { required: true })} />
                        {errors.available_seats && <span className='text-red-600'>Available Seats is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" placeholder="price" className="input input-bordered" {...register("price", { required: true })} />
                        {errors.price && <span className='text-red-600'>Price is required</span>}
                    </div>
                    <div className="form-control mt-3">
                        <button type='submit' className="btn my-custom-btn">Add Class</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClasses;