import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Box, Typography, Grid, Paper } from '@mui/material';
import { db, collection, getDocs, query, where } from '../../firebase'; // Adjust imports based on firebase config
import { getAuth } from 'firebase/auth'; // Import required auth functions
import './AppointmentPage.scss'; // Import the SCSS file for styling

const AppointmentPage = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.data);
  const userRole = user?.role || ''; // Assuming 'role' is part of user data (e.g., 'lawyer' or 'user')
  const userEmail = user?.email || ''; // User's email for both cases (lawyer and user)

  const fetchCases = async () => {
    if (!userEmail) {
      console.error('User email is undefined');
      setError('User email is undefined');
      return;
    }

    const auth = getAuth(); // Initialize Firebase Auth
    const currentUser = auth.currentUser; // Get the current user from Firebase Auth
    if (!currentUser) {
      console.error('User is not authenticated');
      setError('User is not authenticated');
      return;
    }

    try {
      // Fetch ID token only if the user is authenticated
      const token = await currentUser.getIdToken(true); // Force token refresh
      console.log('Auth Token:', token);

      // Query Firestore for cases based on the role of the user
      let casesQuery;
      if (userRole === 'lawyer') {
        // For lawyers, show cases assigned to them
        casesQuery = query(collection(db, 'cases'), where('lawyerEmail', '==', userEmail));
      } else if (userRole === 'user') {
        // For users, show appointments where they are the involved party
        casesQuery = query(collection(db, 'cases'), where('userEmail', '==', userEmail));
      } else {
        console.error('Unknown user role');
        setError('Unknown user role');
        return;
      }

      const casesSnapshot = await getDocs(casesQuery);

      // Map the Firestore data to your cases list
      const casesList = casesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update state with fetched cases
      setCases(casesList);
      setError(null); // Reset error if data is fetched successfully
    } catch (error) {
      console.error('Error fetching cases:', error);
      setError(error.message); // Display the error message to the user
    }
  };

  useEffect(() => {
    fetchCases();
  }, 
  // eslint-disable-next-line
  [userEmail, userRole]); // Re-fetch when user email or role changes

  return (
    <Box className="appointment-page">
      <Typography variant="h4" gutterBottom>
        {userRole === 'lawyer' ? 'Lawyer\'s Appointment List' : 'User\'s Appointments'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Grid layout for displaying cases */}
      <Grid container spacing={2}>
        {cases.map((caseData) => (
          <Grid item xs={12} sm={6} md={3} key={caseData.id}>
            <Paper className="case-card">
              <Typography variant="h6">{userRole === 'lawyer' ? caseData.userName : caseData.lawyerName}</Typography>
              <Typography variant="body2">{caseData.situation}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleProgress(caseData)}>
                View Progress
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Handle the 'View Progress' button click
const handleProgress = (caseData) => {
  console.log('View progress for case:', caseData.id);
  // Implement the logic to view or update progress (e.g., showing a modal or redirecting to progress details)
};

export default AppointmentPage;
