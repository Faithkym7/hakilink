import React from 'react'
import { Box,Typography } from '@mui/material'
import { shades } from '../../../theme';

const DasboardFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        color: shades.darkgreen,
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ marginTop: '1rem' }}>© {currentYear} Entrepreneurial Legal Partner. All rights reserved.</Typography>
    </Box>
  )
}

export default DasboardFooter