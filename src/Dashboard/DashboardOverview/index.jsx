import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase'; // Assuming Firebase setup
import { doc, getDoc } from 'firebase/firestore';
import './DashboardOverview.scss';

const DashboardOverview = () => {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name);
            setUserRole(userDoc.data().role);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

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
