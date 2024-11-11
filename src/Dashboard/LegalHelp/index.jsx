import React from 'react';
import {VictimSituationForm} from '../../components/dashboard/VictimForms';// Importing the Victim Situation Form component
import { Container, Box, Typography } from '@mui/material';
import './LegalHelp.scss'; // Importing the SCSS file for LegalHelp component

const LegalHelp = () => {
  return (
    <Container className="legal-help-container" maxWidth="md">
      <Box className="content-box" display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" className="page-title">
          Legal Assistance for Victims
        </Typography>
        <Typography variant="body1" className="page-description">
          If you or someone you know has been affected by any form of injustice, we are here to help. Please fill out the form below to provide details of your situation, and we will connect you with a suitable lawyer.
        </Typography>

        <VictimSituationForm /> {/* Embedding the VictimSituationForm component here */}
      </Box>
    </Container>
  );
};

export default LegalHelp;
//TODO: create a better UI