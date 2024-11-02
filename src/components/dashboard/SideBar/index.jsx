import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Avatar, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import ChevronLeftIcon
import { shades } from '../../../theme';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const Sidebar = ({ open, toggleSidebar }) => {
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation(); // Initialize location
    const [selectedPath, setSelectedPath] = useState(location.pathname); // State to track selected path

    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon />, path: '/Dashboard' },
        { text: 'Blog', icon: <ArticleIcon />, path: '/Dashboard/Blog' },
        { text: 'Transactions', icon: <PaymentIcon />, path: '/Dashboard/Transactions' },
        {text: 'Jobs', icon:<WorkIcon/>, path:'/Dashboard/Job-Applications'},
        { text: 'Users', icon: <PeopleIcon />, path: '/Dashboard/Users' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/Dashboard/Profile' },
        { text: 'Logout', icon: <LogoutIcon />, path: '/ELP-staff-login' }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setSelectedPath(path); // Update selected path on navigation
    };

    return (
        <Drawer
            variant="persistent"
            open={open}
            sx={{
                width: open ? 240 : 0, // Control the width of the drawer
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: 240, 
                    boxSizing: 'border-box', 
                    backgroundColor: shades.white[500], // Set background color
                    color: shades.darkgreen, // Set text color
                    transition: 'width 0.3s ease' // Smooth transition
                },
            }}
        >
            {/* Sidebar Header */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                        alt="Company Logo" 
                        src="/assets/ELP.png" 
                        sx={{ width: 60, height: 60, marginBottom: 1, marginRight: 1 }}
                    />
                    <Typography variant="h6">
                        ELP
                    </Typography>
                </Box>
                
                {/* Toggle Button */}
                <IconButton onClick={toggleSidebar}>
                    <ChevronLeftIcon />
                </IconButton>
            </Box>

            {/* Menu List */}
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                            backgroundColor: selectedPath === item.path ? shades.darkgreen : 'inherit', // Change background color if selected
                            color: selectedPath === item.path ? 'white' : shades.darkgreen, // Change text color if selected
                            '&:hover': {
                                backgroundColor: shades.darkgreen,
                                color: 'white'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: selectedPath === item.path ? 'white' : shades.darkgreen }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
