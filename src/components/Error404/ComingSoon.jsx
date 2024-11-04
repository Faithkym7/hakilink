// src/components/ComingSoon.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.scss';
import {images} from '../../constants'

const ComingSoon = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="coming-soon">
      <div className="coming-soon-content">
        <h1>Coming Soon!</h1>
        <p>We're working hard to bring you our new site. Stay tuned!</p>
        <img src={images.error404} alt="Coming Soon" className="coming-soon-image" />
        <button onClick={handleBackButtonClick} className="back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
