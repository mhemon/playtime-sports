import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import slide1 from '../../assets/Banner/temp1.png'
import slide2 from '../../assets/Banner/temp2.png'
import slide3 from '../../assets/Banner/temp3.png'
import slide4 from '../../assets/Banner/temp4.png'
import slide5 from '../../assets/Banner/temp5.png'

const Banner = () => {
    return (
        <Carousel interval={2000} transitionTime={500} infiniteLoop={true} showArrows={true} showStatus={false} autoPlay={true} showThumbs={false} dynamicHeight={false} className='z-10'>
            <div>
                <img src={slide1} />
                <p className="legend">Empowered Women Conquer the Field!</p>
            </div>
            <div>
                <img src={slide2} />
                <p className="legend">Women Dominating the Sports Arena</p>
            </div>
            <div>
                <img src={slide3} />
                <p className="legend">A Symphony of Strength, Skill, and Sisterhood!</p>
            </div>
            <div>
                <img src={slide4} />
                <p className="legend">Women&apos; Basketball Revolution!</p>
            </div>
            <div>
                <img src={slide5} />
                <p className="legend">kids with their favourite mentor!</p>
            </div>
        </Carousel>
    );
};

export default Banner;