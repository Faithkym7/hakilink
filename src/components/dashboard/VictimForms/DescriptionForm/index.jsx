import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { db } from '../../../../firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import LawyerMatchingComponent from '../LawyerMatchingComponent'; // Import the matching component
import './VictimSituationForm.scss';
import { useSelector } from 'react-redux';

const VictimSituationForm = () => {
  const name = useSelector((state) => state.user.data.name);
  const contact = useSelector((state) => state.user.data.email);  // Using email as unique identifier
  const [situation, setSituation] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showMatchingComponent, setShowMatchingComponent] = useState(false);
  const [timestamp, setTimestamp] = useState(null);  // Add a state to hold timestamp
  const [latestSituation, setLatestSituation] = useState(null);  // State to hold the latest situation

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!contact) newErrors.contact = 'Contact information is required';
    if (!situation) newErrors.situation = 'Please describe your situation';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Save the victim report to Firestore with email as the identifier
        await addDoc(collection(db, 'victim_reports'), {
          name,
          contact,  // Save email instead of userId
          situation,
          timestamp: new Date(),
        });

        setSuccessMessage('Your report has been successfully submitted.');
        setShowMatchingComponent(true);  // Show matching component on success  
        //console.log("Show Matching Component:", true);     
        setSituation('');
        setErrors({});
        setTimestamp(new Date());  // Set the timestamp state to show submission time
        
        setTimeout(()=>{
          setSuccessMessage('');          
        }, 30000)
        // Fetch the latest situation after submitting the report
        await fetchLatestReport();
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }

    //console.log("Situation:", situation); // Log the situation input
  };

  const fetchLatestReport = async () => {
    try {
      const q = query(
        collection(db, 'victim_reports'),
        where('contact', '==', contact),  // Use email (contact) to filter reports
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestReport = querySnapshot.docs[0].data();
        setLatestSituation(latestReport.situation);  // Set the latest situation
      }
    } catch (error) {
      console.error('Error fetching latest report:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" align="center" gutterBottom>
          Describe Your Situation
        </Typography>
        
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}            
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            label="Contact (Email or Phone)"
            variant="outlined"
            fullWidth
            value={contact}            
            error={!!errors.contact}
            helperText={errors.contact}
            margin="normal"
          />
          <TextField
            label="Describe Your Situation in depth so that you can receive help"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            error={!!errors.situation}
            helperText={errors.situation}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}            
          >
            Submit
          </Button>
        </form>

        {successMessage && (
          <Alert severity="success" sx={{ marginTop: 2, textAlign: 'center' }}>
          {successMessage}
          </Alert>
        )}        

        {timestamp && (
          <Alert severity="success" sx={{ marginTop: 2, textAlign: 'center' }}>
             Report Submitted at: {timestamp.toLocaleString()}
          </Alert>
        )}

        {/* Display the LawyerMatchingComponent only if form is successfully submitted */}
        {showMatchingComponent && latestSituation && (
          <LawyerMatchingComponent situation={latestSituation} />
        )}
      </Paper>
    </Box>
  );
};

export default VictimSituationForm;
