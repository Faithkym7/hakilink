import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import './LawyerMatchingComponent.scss';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure that you have your API key set up securely in .env file
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const LawyerMatchingComponent = ({ situation }) => {
  const [matchedSpecialization, setMatchedSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    setLoading(true);
    setError('');

    try {
      // Get the model instance
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Analyze the following legal situation and recommend the most suitable legal specialization.

        Situation: "${situation}"

        Available Specializations:
        1. Criminal Law (Examples: Theft, Assault, Homicide)
        2. Civil Law (Examples: Personal Injury, Torts, Contract Disputes)
        3. Employment Law (Examples: Workplace Discrimination, Wage Disputes)
        4. Family Law (Examples: Divorce, Child Custody, Domestic Abuse)
        5. Property Law (Examples: Real Estate, Landlord-Tenant Disputes)
        6. Intellectual Property Law (Examples: Copyright, Patents, Trademarks)
        7. Business Law (Examples: Contracts, Mergers, Employment Agreements)

        Please respond with the most appropriate legal specialization based on the situation. Avoid lengthy explanations, just give the specialization i.e if its Civil Law, just output Civil Law
      `;

      // Generate response from the model
      const result = await model.generateContent(prompt);

      // Log the entire response to inspect its structure
      console.log('Full Gemini API response:', result);

      if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
        // Find the best candidate based on confidence score
        const bestCandidate = result.response.candidates.reduce((best, current) =>
          (current.confidence > best.confidence) ? current : best,
          result.response.candidates[0]
        );

        // Log the best candidate for inspection
        console.log('Best Candidate:', bestCandidate);

        if (!bestCandidate) {
          setError('No valid candidates found.');
          return;
        }

        // Use best candidate's response for further processing
        const geminiResponse = bestCandidate.content.parts[0].text;
        console.log('Gemini API response text:', geminiResponse);

        // Match the response to the best legal specialization
        const matched = geminiResponse.toLowerCase().includes('human rights law') ? 'Human Rights Law' :
          geminiResponse.toLowerCase().includes('environmental law') ? 'Environmental Law' :
          geminiResponse.toLowerCase().includes('labor law') ? 'Labor Law' :
          geminiResponse.toLowerCase().includes('immigration law') ? 'Immigration Law' :
          geminiResponse.toLowerCase().includes('public interest law') ? 'Public Interest Law' :
          geminiResponse.toLowerCase().includes('civil rights law') ? 'Civil Rights Law' :
          geminiResponse.toLowerCase().includes('disability rights law') ? 'Disability Rights Law' :
          geminiResponse.toLowerCase().includes('lgbtq+ rights law') ? 'LGBTQ+ Rights Law' :
          'No suitable specialization found.';

        setMatchedSpecialization(matched);

      } else {
        // Handle cases where no candidates are found or other structure issues
        setError('No valid candidates found in the response.');
        console.error('API response candidates issue:', result);
      }

    } catch (err) {
      setError('Error occurred while matching specialization.');
      console.error('Error during API call:', err);
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
