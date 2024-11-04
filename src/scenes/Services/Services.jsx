import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Services.scss'; // Ensure the CSS file is created for styling
import {images} from '../../constants';
import { AppWrap } from '../../Wrapper';
import { useNavigate } from 'react-router-dom';

const services = [
    {
        id: 1,
        title: 'Legal Consultations',
        description: 'Our legal consultation service connects victims with experienced lawyers who specialize in various areas of law. Get tailored guidance and understand your rights.',
        image: images.hero, // Replace with your image path
        buttonText: 'Get Help',
        path:'/sign-up',
    },
    {
        id: 2,
        title: 'Educational Resources',
        description: 'Access a wealth of educational resources designed to empower victims with knowledge about their rights and legal processes.',
        image: images.educational, // Replace with your image path
        buttonText: 'Learn More',
        path:'/coming-soon'
    },
    // Add more services as needed
];

const ServicePage = () => {
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    };

    const handlePrevious = () => {
        setCurrentServiceIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
    };

    return (
        <div className="service-page">
            <header className="service-header">
                <h1>Our <span>Services</span></h1>
                <p>Providing <span>essential</span> support for <span>victims</span> through legal consultations and educational resources.</p>
            </header>

            <motion.div 
                className="service-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
            >
                <div className="service-card-content">
                    <motion.img
                        src={services[currentServiceIndex].image}
                        alt={services[currentServiceIndex].title}
                        className="service-card-image"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                        className="service-text"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>{services[currentServiceIndex].title}</h2>
                        <p>{services[currentServiceIndex].description}</p>
                        <button onClick={()=>navigate(services[currentServiceIndex].path)} className="service-button">{services[currentServiceIndex].buttonText}</button>
                    </motion.div>
                </div>
            </motion.div>

            <div className="service-navigation">
                <button className="nav-button" onClick={handlePrevious}>&lt;</button>
                <span className="service-index">{currentServiceIndex + 1}/{services.length}</span>
                <button className="nav-button" onClick={handleNext}>&gt;</button>
            </div>

            
        </div>
    );
};

export default AppWrap(ServicePage, 'services');
