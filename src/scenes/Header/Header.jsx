import React from 'react';
import './Header.scss';
import { motion } from 'framer-motion';
import { AppWrap } from '../../Wrapper';
import { images } from '../../constants';

const Header = () => {
  return (
    <div className="app__header app__flex">
      {/* Information Section */}
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>🤝</span>
            <div style={{ marginLeft: 20 }}>
              <h1 className="head-text">Welcome to <span>HakiLink</span></h1>
            </div>
          </div>
          
          <div className="tagline">
            <p className="p-text"><span>Connecting</span> You to Justice</p>
            <p className="p-text"><span>Empowering</span> Legal Support for <span>Everyone</span></p>
          </div>
        </div>

        <div className="get-help">
          <a href="#contact">
            <button className="get-help-button">Get Help</button>
          </a>
        </div>

      </motion.div>

      {/* Profile Image */}
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.hero} alt="profile background" className="header__profile-img" />
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
