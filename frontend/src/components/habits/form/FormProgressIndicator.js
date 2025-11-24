import React from 'react';
import { Box, Typography } from '@mui/material';

const FormProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: isActive ? 'primary.main' : isCompleted ? 'primary.light' : 'background.paper',
                  color: isActive || isCompleted ? 'white' : 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  border: isActive ? '2px solid black' : '2px solid #e0e0e0',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {stepNumber}
              </Box>
              {stepNumber < totalSteps && (
                <Box 
                  sx={{ 
                    flex: 1, 
                    height: '1.5px', 
                    bgcolor: isCompleted ? 'primary.main' : 'primary.light',
                    borderRadius: 1 
                  }} 
                />
              )}
            </React.Fragment>
          );
        })}
      </Box>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.625rem',
          color: 'text.secondary',
          fontWeight: 600
        }}
      >
        Step {currentStep} of {totalSteps}
      </Typography>
    </Box>
  );
};

export default FormProgressIndicator;
