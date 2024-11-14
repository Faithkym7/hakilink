import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { db, collection, getDocs, query, where } from '../../firebase'; // Adjust imports based on firebase config
import { getAuth } from 'firebase/auth'; // Import required auth functions
import './LawyerCasesPage.scss';

const LawyerCasesPage = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  // Use Redux to get user data (assuming the user data contains email)
  const user = useSelector((state) => state.user.data);
  const lawyerEmail = user?.email || ''; // Use empty string as fallback to avoid 'undefined' string

  // Function to fetch cases from Firestore
  const fetchCases = async () => {
    if (!lawyerEmail) {
      console.error('Lawyer email is undefined');
      setError('Lawyer email is undefined');
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

      // Query Firestore for cases where lawyerEmail matches
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

  // Fetch cases when the lawyerEmail changes
  useEffect(() => {
    fetchCases();
  }, [lawyerEmail]); // Dependency array includes lawyerEmail to trigger fetch when it changes

  // DataGrid columns setup
  const columns = [
    { field: 'userName', headerName: 'Client Name', width: 200 },
    { field: 'userEmail', headerName: 'Client Contact', width: 200 },
    { field: 'situation', headerName: 'Situation', width: 400 },
    {
      field: 'reachOut',
      headerName: 'Reach Out',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleReachOut(params.row)}>
          Contact
        </Button>
      ),
    },
  ];

  // Handle the 'reach out' button click
  const handleReachOut = (caseData) => {
    console.log('Reach out to', caseData.userEmail);
    // Implement further reach-out functionality (e.g., sending an email or message)
  };

  return (
    <Box className="cases-page">
      <Typography variant="h4" gutterBottom>
        Lawyer's Case List
      </Typography>

      {/* Display any error messages */}
      {error && <Typography color="error">{error}</Typography>}

      {/* DataGrid to display the cases */}
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={cases}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default LawyerCasesPage;
