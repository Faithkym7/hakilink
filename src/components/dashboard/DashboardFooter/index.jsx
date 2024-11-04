import React from 'react';
import { Box,Typography } from '@mui/material';
import './DashboardFooter.scss';

const DasboardFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box className = 'dashboard-footer' >
      <Typography className='footer-text' >© {currentYear} Hakilink. All rights reserved.</Typography>
    </Box>
  )
}

export default DasboardFooter