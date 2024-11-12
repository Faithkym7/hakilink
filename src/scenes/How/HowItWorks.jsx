import React from 'react';
import { AppWrap } from '../../Wrapper';
import './HowItWorks.scss';
import{images} from '../../constants/index'
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
    const navigate = useNavigate();
  return (
    <div className="how-it-works-container">
        <h2 className='head-text'>How It <span>Works</span></h2>
      <div className="how-it-works-content">
        
        {/* Left Text Section */}
        <div className="image-section">
          <img src={images.how} alt="Process Illustration" />
        </div>        

        {/* Right Image Section */}
        <div className="steps">
          
          <ol>
            <li>Fill out the <strong>Victim Situation Form</strong> to describe your case.</li>
            <li>We match you with <strong>qualified lawyers</strong> who can handle your case.</li>
            <li>Choose a lawyer and <strong>book a consultation</strong> to discuss your needs.</li>
            <li>Follow up on your case directly through the <strong>Cases</strong> dashboard.</li>
          </ol>

          <button onClick={() => navigate('/sign-up')}>create account</button>
        </div>
      </div>

      {/* Notice Section */}
      <div className="notice">
        <p>
          We help the you get in touch with a lawyer/law firm for free using our website. However,
          the agreement you will have with the lawyer concerning charges will be up to you and the
          agreement both parties will reach.
        </p>
      </div>
    </div>
  );
};

export default  AppWrap(HowItWorks, 'how it works');
