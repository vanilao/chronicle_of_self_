import React from 'react';
import { Box } from '@mui/material';
import ProgressCircle from './components/progress/ProgressCircle';

const HabitCardProgress = ({ 
  todayCompletionCount, 
  targetCompletions, 
  progressPercentage
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <ProgressCircle 
        percentage={progressPercentage} 
        size={32} 
        thickness={6} 
        showPercentage={false} 
      />
    </Box>
  );
};

export default HabitCardProgress;
