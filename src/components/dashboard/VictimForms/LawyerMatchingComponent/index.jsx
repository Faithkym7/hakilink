import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import './LawyerMatchingComponent.scss';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '../../../../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

// Ensure that you have your API key set up securely in .env file
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const LawyerMatchingComponent = ({ situation }) => {
  const [matchedSpecialization, setMatchedSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lawyers, setLawyers] = useState([]);

  const user = useSelector((state) => state.user.data);

  const handleMatch = async () => {
    setLoading(true);
    setError('');
    setLawyers([]); // Reset lawyers list

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Analyze the following legal situation and recommend the most suitable legal specialization.

        Situation: "${situation}"

        Available Specializations:
        1. Criminal Law
        2. Civil Law
        3. Employment Law
        4. Family Law
        5. Property Law
        6. Intellectual Property Law
        7. Business Law

        Please respond with the most appropriate legal specialization based on the situation.
      `;

      const result = await model.generateContent(prompt);

      if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
        const bestCandidate = result.response.candidates.reduce((best, current) =>
          (current.confidence > best.confidence) ? current : best,
          result.response.candidates[0]
        );

        const geminiResponse = bestCandidate.content.parts[0].text.toLowerCase();
        const matched = geminiResponse.includes('criminal law') ? 'Criminal Law' :
              geminiResponse.includes('civil law') ? 'Civil Law' :
              geminiResponse.includes('employment law') ? 'Employment Law' :
              geminiResponse.includes('family law') ? 'Family Law' :
              geminiResponse.includes('property law') ? 'Property Law' :
              geminiResponse.includes('intellectual property law') ? 'Intellectual Property Law' :
              geminiResponse.includes('business law') ? 'Business Law' :
              'No suitable specialization found.';

        setMatchedSpecialization(matched);

        if (matched !== 'No suitable specialization found.') {
          fetchLawyers(matched);
        } else {
          setError('No suitable specialization found.');
        }

      } else {
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

  const fetchLawyers = async (specialization) => {
    try {
      const q = query(
        collection(db, 'users'),
        where('specialization', '==', specialization),
        where('role', '==', 'lawyer')
      );
      
      const querySnapshot = await getDocs(q);
      const lawyerList = querySnapshot.docs.map(doc => doc.data());
      setLawyers(lawyerList);

    } catch (error) {
      setError('Error fetching lawyers.');
      console.error('Error during lawyer fetch:', error);
    }
  };

  const handlebooking = async(lawyer)=>{    
    try {
      await addDoc(collection(db, "cases"), {
        userName: user.name,
        userEmail: user.email,
        situation,
        lawyerName: lawyer.name,
        lawyerPhone: lawyer.phone,
        lawyerEmail: lawyer.email,
      });
      alert("Booking successful!");
    } catch (err) {
      setError("Error occurred while booking the lawyer.");
      console.error("Booking error:", err);
    }
  }
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleMatch} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Find Matched Lawyer Specialization'}
      </Button>

      {error && <Typography color="error" marginTop={2}>{error}</Typography>}

      {matchedSpecialization && (
        <Typography variant="h6" marginTop={2}>
          Recommended Specialization: {matchedSpecialization}
        </Typography>
      )}

      {lawyers.length > 0 && (
        <List>
          {lawyers.map((lawyer, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={lawyer.name}
                secondary={
                  <>
                    <Typography>Phone: {lawyer.phone}</Typography>
                    <Typography>Email: {lawyer.email}</Typography>
                  </>
                }
              />
              <Button variant="outlined" color="primary" onClick={()=> handlebooking(lawyer)}>Book</Button>
              {/* TODO: navigate to cases */}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default LawyerMatchingComponent;
