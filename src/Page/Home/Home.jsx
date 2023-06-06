import React from 'react';
import Banner from '../../Components/Banner/Banner';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className='pt-16'>
            <Helmet>
                <title>PlayTime Sports | Home</title>
            </Helmet>
            <Banner/>
        </div>
    );
};

export default Home;