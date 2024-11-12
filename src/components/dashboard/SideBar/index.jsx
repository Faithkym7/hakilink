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
import { useSelector } from 'react-redux';  // Import useSelector to access the user's role from Redux
import './Sidebar.scss'; // Import the SCSS file
import {images} from '../../../constants'

const Sidebar = ({ open, toggleSidebar }) => {
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation(); // Initialize location
    const [selectedPath, setSelectedPath] = useState(location.pathname); // State to track selected path

    // Get the user's role from Redux
    const userRole = useSelector((state) => state.user.data.role); // Assuming the role is stored in the Redux store

    // Define the menu items with paths and icons
    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon />, path: '/Dashboard' },
        { text: 'Profile', icon: <PersonIcon/>, path: '/Profile' },
        { text: 'Legal Help', icon: <Diversity1Icon />, path: '/Legal-help' },
        { text: 'Appointments', icon: <CalendarMonthIcon/>, path: '/coming-soon' },
        { text: 'Cases', icon: <WorkIcon />, path: '/coming-soon' },
        { text: 'Clients', icon: <PeopleIcon />, path: '/coming-soon' },        
        { text: 'Logout', icon: <LogoutIcon />, path: '/log-in' }
    ];

    // Filter menu items based on the user's role
    const filteredMenuItems = menuItems.filter(item => {
        if (userRole === 'user') {
            return item.text !== 'Cases' && item.text !== 'Clients'; // 'user' cannot see Cases or Clients
        }
        if (userRole === 'lawyer') {
            return item.text !== 'Legal Help'; // 'lawyer' cannot see Legal Help
        }
        return true; // If there's no role or another role, show all items
    });

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
                        src={images.logo}
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
                {filteredMenuItems.map((item) => (
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
