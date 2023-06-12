import React, { useState, useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import { Fade } from 'react-awesome-reveal';

const FunFactsSection = () => {
    const [funFacts, setFunFacts] = useState([]);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const { theme } = useAuth()
    
    useEffect(() => {
        fetch('https://playtime-sports-server.vercel.app/facts')
        .then(res => res.json())
        .then(data => setFunFacts(data))
    }, []);

    const handleNextFactClick = () => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
    };

    return (
        <section className={`card shadow-md py-8 mx-4 my-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-base-100'}`}>
            <h2 className="text-2xl font-bold text-center mb-4">Fun Facts</h2>
            {funFacts.length > 0 ? (
                <Fade cascade>
                    <p className="text-lg text-center mb-4 mx-4">
                        Did you know that {' '}
                        {funFacts[currentFactIndex].fact.toLowerCase()}?
                    </p>
                    <div className='flex justify-center'>
                        <button className="my-custom-btn text-white font-bold py-2 px-4 rounded" onClick={handleNextFactClick}>
                            Next Fact
                        </button>
                    </div>
                </Fade>
            ) : (
                <p>Loading fun facts...</p>
            )}
        </section>
    );
};

export default FunFactsSection;
