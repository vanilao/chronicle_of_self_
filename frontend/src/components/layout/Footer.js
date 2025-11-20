import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: 'background.paper',
      borderTop: '3px solid black',
      py: 6
    }}
  >
    <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Box component="img" src="/chronicle.png" alt="Chronicle emblem" sx={{ width: 40, height: 40 }} />
        <Typography
          sx={{
            fontFamily: 'VT323, monospace',
            fontSize: '1.25rem',
            color: 'text.primary'
          }}
        >
          CHRONICLE OF SELF
        </Typography>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.875rem',
            color: 'text.secondary'
          }}
        >
          Level up your life through gamified habit tracking.
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default Footer;
