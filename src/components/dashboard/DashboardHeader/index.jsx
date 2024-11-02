import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import { shades } from '../../../theme';

const DashboardHeader = ({ toggleSidebar }) => {
  const username = 'Faith';

  return (
    <AppBar position="static" sx={{ backgroundColor: shades.white[500], color: shades.darkgreen, padding: '0 16px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Menu Icon for Sidebar toggle */}
        <IconButton color="inherit" edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon sx={{ fontSize: '2rem' }}/>
        </IconButton>

        {/* Greeting Section */}
        <Typography variant="h6">
          Hello, {username}
        </Typography>

        {/* User Icon and Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* User Icon */}
          <IconButton color="inherit">
            <AccountCircleIcon sx={{ fontSize: '2.5rem' }}/>
          </IconButton>

          {/* Logout Button */}
          <Button
            color="inherit"
            startIcon={<LogoutIcon sx={{ fontSize: '2rem' }}/>}
            sx={{ marginLeft: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
