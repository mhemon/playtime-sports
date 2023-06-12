import React from 'react';
import { BsGoogle } from "react-icons/bs";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';

const SocialLogin = () => {
    const {googleLogin} = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogle = () => {
        googleLogin()
            .then((result) => {
                // console.log(result.user.displayName, result.user.email);
                fetch('https://playtime-sports-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ name: result.user.displayName, email: result.user.email })
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: `${error.code}`
                })
            })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className='flex justify-center items-center pb-4'>
                <button onClick={handleGoogle} className="btn btn-circle my-custom-btn">
                    <BsGoogle color='white'/>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;