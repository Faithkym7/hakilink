import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from MUI
import { db, collection, getDocs, query, where } from '../../firebase'; // Adjust imports based on firebase config
import { getAuth } from 'firebase/auth'; // Import required auth functions
import './ClientAppointmentPage.scss'; // Import the SCSS file for styling

const ClientAppointmentPage = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.data);
  const lawyerEmail = user?.email || ''; // Use user's email to fetch cases

  const fetchCases = async () => {
    if (!lawyerEmail) {
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

      // Query Firestore for cases where the current user's email is the involved user
      const q = query(collection(db, 'cases'), where('lawyerEmail', '==', lawyerEmail));
      const casesSnapshot = await getDocs(q);

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
  }, [lawyerEmail]); // Re-fetch when user email changes

  // Define columns for the DataGrid
  const columns = [
    { field: 'userName', headerName: 'User Name', flex:1, width: 200 },
    { field: 'userEmail', headerName: 'User Email',flex: 1, width: 250 },
    {
      field: 'viewProgress',
      headerName: 'View Progress',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleProgress(params.row)}
        >
          View Progress
        </Button>
      ),
      flex:1,
      width: 180,
      sortable: false,
      filterable: false,
    },
  ];

  // Handle the 'View Progress' button click
  const handleProgress = (caseData) => {
    console.log('View progress for case:', caseData.id);
    // Implement the logic to view or update progress (e.g., showing a modal or redirecting to progress details)
  };

  return (
    <Box className="appointment-page" sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Client's Appointment List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* DataGrid layout for displaying client cases */}
      <Paper elevation={3} className="data-grid-paper">
        <Box
          sx={{
            height: '100%',
            width: '100%',
            '@media (max-width: 600px)': {
              // Adjust the grid layout for small screens (mobile)
              fontSize: '14px',
            },
            '@media (min-width: 600px) and (max-width: 900px)': {
              // Adjust the grid layout for tablets
              fontSize: '16px',
            },
          }}
        >
          <DataGrid
            rows={cases}
            columns={columns}
            pageSize={5} // Number of rows per page
            rowsPerPageOptions={[5, 10, 20]} // Allow changing page size
            disableSelectionOnClick
            autoHeight
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#3f51b5',
                color: 'white',
              },
              '& .MuiDataGrid-cell': {
                color: '#333',
              },
              '& .MuiButton-containedPrimary': {
                backgroundColor: '#3f51b5',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ClientAppointmentPage;
