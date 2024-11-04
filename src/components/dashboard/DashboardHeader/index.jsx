import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './DashboardHeader.scss';
import { auth, db } from '../../../firebase'; // Import db (Firestore instance) along with auth
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const DashboardHeader = ({ toggleSidebar }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Reference the user's document in the Firestore 'users' collection
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Set the username from Firestore, or fallback to 'User'
            setUsername(userDoc.data().name || 'User');
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/#home'); // Optionally, redirect to home page or login
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar position="static" className="dashboard-header">
      <Toolbar className="toolbar">
        
        {/* Menu Icon for Sidebar toggle */}
        <IconButton color="inherit" edge="start" onClick={toggleSidebar} className="menu-icon">
          <MenuIcon />
        </IconButton>

        {/* Greeting Section */}
        <Typography variant="h6" className="greeting">
          Hello, {username || 'User'}
        </Typography>

        {/* User Icon and Logout */}
        <Box className="user-section">
          {/* User Icon */}
          <IconButton color="inherit">
            <AccountCircleIcon className="account-icon" />
          </IconButton>

          {/* Logout Button */}
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            className="logout-button"
            onClick={handleLogout} // Logout functionality
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
