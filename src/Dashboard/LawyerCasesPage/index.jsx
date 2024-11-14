import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../../firebase';  // Assuming firebase is initialized in a separate file
import './LawyerCasesPage.scss';

const LawyerCasesPage = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    // Fetch cases from Firestore (assuming your Firestore structure stores them in 'cases' collection)
    const fetchCases = async () => {
      try {
        const casesSnapshot = await db.collection('cases').get();
        const casesList = casesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCases(casesList);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, []);

  // Columns for the DataGrid
  const columns = [
    { field: 'userName', headerName: 'Client Name', width: 200 },
    { field: 'userEmail', headerName: 'Client Contact', width: 200 },
    { field: 'situation', headerName: 'Situation', width: 400 },
    {
      field: 'reachOut',
      headerName: 'Reach Out',
      width: 150,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleReachOut(params.row)}
        >
          Contact
        </Button>
      ),
    },
  ];

  const handleReachOut = (caseData) => {
    // Handle the 'reach out' functionality (e.g., open email client, etc.)
    console.log('Reach out to', caseData.userEmail);
    // Implement any necessary action, e.g., open email client
  };

  return (
    <Box className="cases-page">
      <Typography variant="h4" gutterBottom>
        Lawyer's Case List
      </Typography>
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
//TODO: fetch cases according to the lawyer