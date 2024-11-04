import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Avatar, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import './Sidebar.scss'; // Import the SCSS file

const Sidebar = ({ open, toggleSidebar }) => {
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation(); // Initialize location
    const [selectedPath, setSelectedPath] = useState(location.pathname); // State to track selected path

    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon />, path: '/Dashboard' },
        { text: 'Profile', icon: <PersonIcon/>, path: '/Dashboard/Profile' },
        { text: 'Legal Help', icon: <Diversity1Icon />, path: '/Dashboard/Blog' },
        { text: 'Appointments', icon: <CalendarMonthIcon/>, path: '/Dashboard/Transactions' },
        { text: 'Cases', icon: <WorkIcon />, path: '/Dashboard/Job-Applications' },
        { text: 'Clients', icon: <PeopleIcon />, path: '/Dashboard/Users' },        
        { text: 'Logout', icon: <LogoutIcon />, path: '/log-in' }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setSelectedPath(path); // Update selected path on navigation
    };

    return (
        <Drawer
            variant="persistent"
            open={open}
            className="sidebar"
            sx={{
                width: open ? '240px' : 0 ,
            }}
        >
            {/* Sidebar Header */}
            <Box className="sidebar-header">
                <Box className="logo-container">
                    <Avatar 
                        alt="Company Logo" 
                        src="/assets/ELP.png" 
                        className="company-logo"
                    />
                    <Typography variant="h6">Hakilink</Typography>
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
                        className={`menu-item ${selectedPath === item.path ? 'selected' : ''}`}
                    >
                        <ListItemIcon className={`menu-icon ${selectedPath === item.path ? 'selected-icon' : ''}`}>
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


//TODO: update sidebar according to users