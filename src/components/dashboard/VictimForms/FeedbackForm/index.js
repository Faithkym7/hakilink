import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { db } from '../../../../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './FeedbackForm.scss';
const FeedbackForm = ({ caseId }) => {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Rendering FeedbackForm", caseId);
  }, [caseId]);

  const handleSubmit = async () => {
    if (!rating) {
      setError("Please provide a rating.");
      return;
    }

    try {
      await updateDoc(doc(db, "cases", caseId), {
        feedback: comments,
        match_success: parseInt(rating) >= 3 ? 1 : 0, // Successful match if rating is 3+
      });
      alert("Feedback submitted successfully!");
      navigate('/Appointment-page');
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback.");
    }
  };

  return (
    <div className='feedback-form'>
      <Typography variant="h6">Rate Your Experience</Typography>
      <TextField 
        label="Rating from a scale of (1-5)" 
        type="number" 
        value={rating} 
        onChange={(e) => setRating(e.target.value)} 
        fullWidth
        className='input-field'
      />
      <TextField 
        label="Comments" 
        multiline 
        rows={4} 
        value={comments} 
        onChange={(e) => setComments(e.target.value)} 
        fullWidth
        className='input-field'
      />
      <Button variant="contained" color="primary" className='submit-button' onClick={handleSubmit}>Submit Feedback</Button>
      {error && <Typography className='error-text'>{error}</Typography>}
    </div>
  );
};

export default FeedbackForm;
