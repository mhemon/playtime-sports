import React from 'react';
import Banner from '../../Components/Banner/Banner';
import { Helmet } from 'react-helmet-async';
import { Fade } from 'react-awesome-reveal';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>PlayTime Sports | Home</title>
            </Helmet>
            <Banner/>
        </div>
    );
};

export default Home;