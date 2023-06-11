import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hook/useAuth';
import { Fade } from 'react-awesome-reveal';

const ContactSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const {theme} = useAuth()
    const handleSubmit = (e) => {
        e.preventDefault();

        // send email here
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your message has been sent',
            showConfirmButton: false,
            timer: 1500
          })

        // Clear the form fields
        setName('');
        setEmail('');
        setQuestion('');
    };

    return (
        <section className={`py-8 px-4 ${theme === 'dark' ? 'bg-slate-700 my-4' : 'bg-base-100'}`}>
            <Fade cascade>
            <h2 className="text-2xl font-bold text-center mb-4">Contact</h2>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="question" className="block font-semibold">
                        Question
                    </label>
                    <textarea
                        id="question"
                        value={question}
                        placeholder='Enter your Question please.'
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <div className='text-center'>
                    <button
                        type="submit"
                        className="my-custom-btn text-white font-bold py-2 px-8 rounded"
                    >
                        Send
                    </button>
                </div>
            </form>
            </Fade>
        </section>
    );
};

export default ContactSection;
