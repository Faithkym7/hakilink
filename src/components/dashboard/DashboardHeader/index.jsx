import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import './DashboardHeader.scss';
import { auth } from '../../../firebase'; // Import Firebase auth for sign-out functionality
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Use the useSelector hook to get user data from the Redux store
  const user = useSelector((state) => state.user.data);

  // Set up username and specialization state based on user data from Redux
  const username = user?.name || 'User';
  const specialization = user?.role === 'lawyer' ? user.specialization || '' : '';

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      navigate('/#home'); // Redirect to home page after logout
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
          Hello, {username}
          {specialization && <span> - {specialization}</span>}
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
