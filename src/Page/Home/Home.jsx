import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import { Helmet } from 'react-helmet-async';
import { Fade } from 'react-awesome-reveal';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { motion } from 'framer-motion';
import FunFactsSection from '../../Components/FunFactsSection/FunFactsSection';
import useAuth from '../../hook/useAuth';
import ContactSection from '../../Components/ContactSection/ContactSection';

const Home = () => {
    const [popularClasses, setPopularClasses] = useState([])
    const [popularInstructor, setPopularInstructor] = useState([])
    const { theme } = useAuth()
    useEffect(() => {
        fetch('https://playtime-sports-server.vercel.app/popular-classes')
            .then(res => res.json())
            .then(data => setPopularClasses(data))
    }, [])

    useEffect(() => {
        fetch('https://playtime-sports-server.vercel.app/popular-instructor')
            .then(res => res.json())
            .then(data => setPopularInstructor(data))
    }, [])

    return (
        <div>
            <Helmet>
                <title>PlayTime Sports | Home</title>
            </Helmet>
            <Banner />
            {/* popular classes */}
            <section>
                <SectionTitle heading='Popular Classes' />
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {
                        popularClasses.map(popular => <motion.div
                            key={popular._id}
                            className={`card w-full lg:w-96 shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-slate-700' : 'bg-base-100'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <Fade cascade>
                                    <figure className='relative h-52'>
                                        <img src={popular.image} alt="Class" />
                                    </figure>
                                </Fade>
                                <div className="card-body">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Taken By:- {popular.instructor_name}</h2>
                                    <h2 className="card-title">{popular.name}</h2>
                                    <p>Total Enrolled : {popular.enrolled}</p>
                                </div>
                            </div>
                        </motion.div>)
                    }
                </div>
            </section>

            {/* popular Instructor */}
            <section>
                <SectionTitle heading='Popular Instructor' />
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {
                        popularInstructor.map(popular => <motion.div
                            key={popular._id}
                            className={`card w-full lg:w-96 shadow-xl overflow-hidden border-l-8 border-b-8 border-x-cyan-500 border-y-blue-500 hover:border-x-pink-500 hover:border-y-yellow-500 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-base-100'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <Fade cascade>
                                    <figure className='relative h-52'>
                                        <img className='' src={popular.image} alt="Class" />
                                    </figure>
                                </Fade>
                                <div className="card-body">
                                    <h2 className="card-title">{popular.name}</h2>
                                    {/* <p>Total Enrolled : </p> */}
                                </div>
                            </div>
                        </motion.div>)
                    }
                </div>
            </section>
            {/* fun facts section */}
            <section>
                <FunFactsSection />
            </section>
            {/* contact section */}
            <section>
                <ContactSection />
            </section>
        </div>
    );
};

export default Home;