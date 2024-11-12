import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './SignUp.scss';
import { images } from '../../constants';
import { motion } from 'framer-motion';
//import firestore
import {doc,setDoc} from 'firebase/firestore';
// Import the initialized auth instance
import { auth, db } from '../../firebase.js'; // Adjust the path if needed

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const socialJusticeSpecializations = [
  'Human Rights Law',
  'Environmental Law',
  'Labor Law',
  'Immigration Law',
  'Public Interest Law',
  'Civil Rights Law',
  'Disability Rights Law',
  'LGBTQ+ Rights Law'
];

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
        // Sign up user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            role: role,
            specialization: role === 'lawyer' ? specialization : null,
            createdAt: new Date() // Optional: timestamp for account creation
        });

        setOpenSnackbar(true);
        setName('');
        setEmail('');
        setPassword('');
        setSpecialization('');
        
        setTimeout(() => {
          navigate('/log-in');
        }, 1500);
        
    } catch (err) {
        console.error("Error during signup:", err);  // Log the full error
        if (err.code === 'auth/email-already-in-use') {
            setError('Email already exists. Please log in.');
        } else if (err.message) {
            setError(`Error: ${err.message}`);
        } else {
            setError('An error occurred. Please try again.');
        }
    }
};
  
  
  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div className='signup'>
      <div className="signup-container">
        <div className='signup-container-media'>
          <motion.img
            src={images.care}
            alt='care'
            className='signup-container-image'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <h6>We care about You</h6>
        </div>
        <div className='signup-container-section'>
          <h1>Welcome to <span>Hakilink</span></h1>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            {error && (
              <p className="error-message">
                {error} <span onClick={() => navigate('/log-in')}>Log in</span>
              </p>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="lawyer">Lawyer</MenuItem>
              </Select>
            </div>

            {role === 'lawyer' && (
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <Select
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                >
                  {socialJusticeSpecializations.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{display:'flex', alignItems:'center'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  fontSize: '1rem',
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              </div>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="signup-prompt">
            <p>Already have an account? <span onClick={() => navigate('/log-in')}>Log-In</span></p>
          </div>
        </div>      

        {/* Snackbar for Signup Success */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}  // Snackbar will disappear after 3 seconds
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Signup successful!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Signup;
