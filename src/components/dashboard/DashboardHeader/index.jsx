import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './DashboardHeader.scss'; // Import the SCSS file
import { auth } from '../../../firebase'; // Adjust the path as necessary
import { signOut } from 'firebase/auth'; // Import signOut function
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ toggleSidebar }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser; // Get the current user from Firebase
    if (user) {
      const emailParts = user.email.split('@'); // Split the email at '@'
      setUsername(emailParts[0]); // Set the username to the part before '@'
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/#home')// Optionally, redirect to login page or show a success message
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
