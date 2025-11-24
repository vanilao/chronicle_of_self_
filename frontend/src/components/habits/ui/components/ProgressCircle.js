import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const ProgressCircle = ({ percentage, size = 32, thickness = 6, showPercentage = true }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return '#4caf50';  // Green for complete
    if (percentage >= 75) return '#ff9800';   // Orange for close
    if (percentage >= 50) return '#2196f3';   // Blue for halfway
    return '#f44336'; // Red for low progress
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={thickness}
        sx={{
          color: getProgressColor(percentage),
          transition: 'color 0.3s ease-in-out',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.3s ease-in-out'
          }
        }}
      />
      {showPercentage && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: size > 30 ? '0.625rem' : '0.5rem',
              fontWeight: 700,
              color: percentage === 100 ? getProgressColor(percentage) : 'text.primary'
            }}
          >
            {`${Math.round(percentage)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProgressCircle;
