import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../dashboard/DashboardHeader';
import DashboardFooter from '../dashboard/DashboardFooter';
import Sidebar from '../dashboard/SideBar';
import { CssBaseline, useMediaQuery } from '@mui/material';

const DashboardLayout = () => {
  // Detect if the screen width is large (e.g., at least 1024px)
  const isLargeScreen = useMediaQuery('(min-width:1024px)');
  const [sidebarOpen, setSidebarOpen] = useState(isLargeScreen); // Set default based on screen size

  // Update sidebar open/close based on screen size when the component mounts or screen size changes
  useEffect(() => {
    setSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  const toggleSidebar = () => {
    setSidebarOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Sidebar component with open/close controlled by state */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <DashboardHeader toggleSidebar={toggleSidebar} /> {/* Pass toggleSidebar to header */}
        
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
