import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import './LawyerMatchingComponent.scss';


const LawyerMatchingComponent = ({ situation }) => {
  const [matchedSpecialization, setMatchedSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    setLoading(true);
    setError('');
    try {
      // Send user input (situation) to Gemini API
      const response = await axios.post('https://api.google.com/generative-ai', {
        model: 'gemini-1.5-flash',
        apiKey: process.env.REACT_APP_GEMINI_API_KEY, // Make sure to keep your key secure
        prompt: situation,
      });

      const geminiResponse = response.data.text; // Extract response text

      // Define specialization keywords for matching
      const specializationKeywords = {
        'Human Rights Law': ['discrimination', 'rights', 'freedom', 'justice', 'abuse'],
        'Environmental Law': ['environment', 'pollution', 'waste', 'wildlife', 'conservation'],
        'Labor Law': ['employment', 'workplace', 'wages', 'unions', 'labor'],
        'Immigration Law': ['visa', 'immigration', 'deportation', 'citizenship', 'asylum'],
        'Public Interest Law': ['public interest', 'community', 'nonprofit', 'social justice'],
        'Civil Rights Law': ['civil rights', 'discrimination', 'equality', 'freedom', 'justice'],
        'Disability Rights Law': ['disability', 'accessibility', 'rights', 'accommodation'],
        'LGBTQ+ Rights Law': ['lgbtq+', 'gay', 'transgender', 'queer', 'rights'],
      };

      // Initialize scores for each specialization
      const scores = {};

      // Match keywords with Gemini response
      Object.entries(specializationKeywords).forEach(([specialization, keywords]) => {
        scores[specialization] = 0;
        keywords.forEach((keyword) => {
          if (geminiResponse.toLowerCase().includes(keyword.toLowerCase())) {
            scores[specialization] += 1;
          }
        });
      });

      // Find the specialization with the highest score
      const bestMatch = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      setMatchedSpecialization(bestMatch);

    } catch (err) {
      setError('Error occurred while matching specialization.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleMatch} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Find Matched Lawyer Specialization'}
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {matchedSpecialization && (
        <Typography variant="h6" marginTop={2}>
          Recommended Specialization: {matchedSpecialization}
        </Typography>
      )}
    </Box>
  );
};

export default LawyerMatchingComponent;
