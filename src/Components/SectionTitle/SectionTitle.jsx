import React from 'react';
import useAuth from '../../hook/useAuth';

const SectionTitle = ({heading}) => {
    const {theme} = useAuth()
    return (
        <div className='text-center my-4'>
            <h3 className={`text-3xl font-bold p-5 ${theme === 'dark' ? 'bg-slate-700' : 'bg-[#f7f7f7]'}`}>{heading}</h3>
            <div className="divider"></div> 
        </div>
    );
};

export default SectionTitle;