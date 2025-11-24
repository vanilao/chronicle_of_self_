import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';

const TemplateFooter = ({ templateCount, activeTab }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.75rem',
          color: 'text.secondary',
          fontStyle: 'italic'
        }}
      >
        {templateCount} {activeTab === 0 ? 'quick start' : 'community'} templates found
      </Typography>
    </Box>
  );
};

export default TemplateFooter;
