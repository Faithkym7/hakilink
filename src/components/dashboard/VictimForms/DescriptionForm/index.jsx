import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { db } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import LawyerMatchingComponent from '../LawyerMatchingComponent'; // Import the matching component
import './VictimSituationForm.scss'

const VictimSituationForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [situation, setSituation] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showMatchingComponent, setShowMatchingComponent] = useState(false);

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
        await addDoc(collection(db, 'victim_reports'), {
          name,
          contact,
          situation,
          timestamp: new Date(),
        });

        setSuccessMessage('Your report has been successfully submitted.');
        setShowMatchingComponent(true); // Show matching component on success
        setName('');
        setContact('');
        setSituation('');
        setErrors({});
      } catch (error) {
        console.error('Error saving document:', error);
      }
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
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            label="Contact (Email or Phone)"
            variant="outlined"
            fullWidth
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            error={!!errors.contact}
            helperText={errors.contact}
            margin="normal"
          />
          <TextField
            label="Describe Your Situation"
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
          <Typography variant="body1" color="success" align="center" marginTop={2}>
            {successMessage}
          </Typography>
        )}

        {/* Display the LawyerMatchingComponent only if form is successfully submitted */}
        {showMatchingComponent && <LawyerMatchingComponent situation={situation} />}
      </Paper>
    </Box>
  );
};

export default VictimSituationForm;
//TODO: error handle form submission
//TODO: Create a better UI
