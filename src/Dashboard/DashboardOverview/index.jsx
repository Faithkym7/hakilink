import React from 'react';
import { useSelector } from 'react-redux';  // Import useSelector from Redux
import './DashboardOverview.scss';

const DashboardOverview = () => {
  // Get user data and role from Redux store
  const userName = useSelector((state) => state.user.data.name);
  const userRole = useSelector((state) => state.user.data.role);

  return (
    <div className="dashboard-overview">
      <h2>Welcome, {userName || 'User'}</h2>
      <p>Your role: {userRole || 'loading...'}</p>

      {userRole === 'user' && (
        <div className="overview-section">
          <h3>Your Dashboard</h3>
          <ul>
            <li>Recent Activity</li>
            <li>Messages</li>
            <li>Profile Settings</li>
          </ul>
        </div>
      )}

      {userRole === 'lawyer' && (
        <div className="overview-section lawyer">
          <h3>Lawyer Dashboard</h3>
          <ul>
            <li>Cases Assigned</li>
            <li>Specializations</li>
            <li>Upcoming Meetings</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
