import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../dashboard/DashboardHeader';
import DashboardFooter from '../dashboard/DashboardFooter';
import Sidebar from '../dashboard/SideBar';
import { CssBaseline } from '@mui/material';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default state: open

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Persistent Sidebar */}
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

//TODO: create user, admin and lawyer dashboard 