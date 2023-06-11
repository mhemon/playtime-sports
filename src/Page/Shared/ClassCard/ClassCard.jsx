import React from 'react';
import formatDate from '../../../utils/DateFormat';
import { Fade } from 'react-awesome-reveal';
import useAuth from '../../../hook/useAuth';

const ClassCard = ({ data }) => {
    const {theme} = useAuth()
    return (
        <div>
            {
                data.map((item) => (
                    <div key={item._id} className='grid grid-cols-1 gap-4 mb-4'>
                        {item.classNames.map((className, index) => (
                            <div key={index} className={`card w-full shadow-xl ${theme === 'dark' ? 'bg-slate-700' : 'bg-base-200'}`}>
                                <Fade cascade>
                                <figure className='relative h-52'>
                                    <div className="badge badge-secondary absolute top-4 right-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-lg">Enrolled</div>
                                    <img className='bg-cover border-l-8 border-t-8 border-orange-300 rounded-lg' src={item.classImage[index]} alt="Class" />
                                </figure>
                                </Fade>
                                <h2 className='text-2xl text-center pb-2 font-semibold'>Class Name: {className}</h2>
                                <p className='text-center pb-4'>Enrolled Date: {formatDate(item.date)}</p>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    );
};

export default ClassCard;
