import React from 'react';
import { Box, Typography } from '@mui/material';

const FormStepSection = ({ 
  title, 
  children, 
  stepNumber, 
  totalSteps,
  isOptional = false 
}) => {
  return (
    <Box
      sx={{
        p: 2,
        border: '2px solid #e0e0e0',
        borderRadius: 1.5,
        bgcolor: 'background.paper',
        boxShadow: '1px 1px 0px rgba(0,0,0,0.1)',
        mt: stepNumber > 1 ? 1.5 : 0
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.625rem',
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Step {stepNumber}: {title}
          {isOptional && (
            <Typography
              component="span"
              sx={{
                ml: 1,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.5rem',
                color: 'text.secondary',
                fontStyle: 'italic'
              }}
            >
              (Optional)
            </Typography>
          )}
        </Typography>
        <Box sx={{ flex: 1, height: '1.5px', bgcolor: 'primary.light', borderRadius: 1 }} />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {children}
      </Box>
    </Box>
  );
};

export default FormStepSection;
