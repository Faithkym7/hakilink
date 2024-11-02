import React from 'react';
import './About.scss';
import { motion } from 'framer-motion';
import { AppWrap } from '../../Wrapper';
import { images } from '../../constants';

const About = () => {
  return (
    <div className="app__about app__flex">
      <motion.div
        whileInView={{ opacity: [0, 1], y: [50, 0] }}
        transition={{ duration: 0.5 }}
        className="app__about-info"
      >
        <h1 className="head-text">About <span>HakiLink</span></h1>
        <p className="p-text">
          At HakiLink, we are a dedicated group of students passionate about 
          leveraging technology to enhance access to justice. Our journey began 
          with a shared vision to empower individuals with legal support and 
          information at their fingertips.
        </p>
        <p className="p-text">
          We understand the challenges that people face when seeking legal 
          assistance, and we aim to bridge that gap by providing a platform 
          that connects users with legal resources, professionals, and 
          support services.
        </p>
        <h2 className="sub-heading">Our Mission</h2>
        <p className="p-text">
          To create an inclusive legal ecosystem where everyone has access to 
          the support they need to navigate their legal journeys confidently.
        </p>
        <h2 className="sub-heading">Our Vision</h2>
        <p className="p-text">
          A world where legal assistance is accessible, transparent, and 
          effective for all, regardless of their background or circumstances.
        </p>
        <h2 className="sub-heading">Meet the Team</h2>
        <div className="team">
          <div className="team-member">
            <img src={images.member} alt="Team Member 1" />
            <h3 className="member-name">Serene Kimani</h3>
            <p className="member-role">Co-Founder & Team Lead </p>
          </div>
          <div className="team-member">
            <img src={images.member} alt="Team Member 2" />
            <h3 className="member-name">Laura Adeya</h3>
            <p className="member-role">Co-Founder </p>
          </div>
          <div className="team-member">
            <img src={images.member} alt="Team Member 3" />
            <h3 className="member-name">Mary Inviolata</h3>
            <p className="member-role">Co-Founder </p>
          </div>
          <div className="team-member">
            <img src={images.member} alt="Team Member 3" />
            <h3 className="member-name">Grace Mutheu</h3>
            <p className="member-role">Co-Founder </p>
          </div>
          <div className="team-member">
            <img src={images.member} alt="Team Member 3" />
            <h3 className="member-name">Bridgit Maeba</h3>
            <p className="member-role">Co-Founder </p>
          </div>
          <div className="team-member">
            <img src={images.member} alt="Team Member 3" />
            <h3 className="member-name">Ann Kamau</h3>
            <p className="member-role">Co-Founder </p>
          </div>
          <div className="team-member">
            <img src={images.member} alt="Team Member 3" />
            <h3 className="member-name">Mary Maina</h3>
            <p className="member-role">Co-Founder </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1], x: [50, 0] }}
        transition={{ duration: 0.5 }}
        className="app__about-image"
      >
        <img src={images.students} alt="About Us" className="about-image" />
      </motion.div>
    </div>
  );
};

export default AppWrap(About, 'about');
