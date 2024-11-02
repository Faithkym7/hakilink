import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>

      <ul className="app__navbar-links">
        {['home', 'about', 'services', 'contact'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}        
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {['home', 'about', 'services', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
              <button onClick={() => navigate('/sign-up')} className="navbar_button">SIGNUP</button>
              <button onClick={() => navigate('/log-in')} className="navbar_button">LOGIN</button>
            </ul>
          </motion.div>
        )}
      </div>

      <div className="app__navbar-button">
        <button onClick={() => navigate('/sign-up')} className="navbar_button">SIGNUP</button>
        <button onClick={() => navigate('/log-in')} className="navbar_button">LOGIN</button>
      </div>
    </nav>
  );
};

export default Navbar;