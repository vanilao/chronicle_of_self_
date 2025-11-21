import React from 'react';
import { Typography, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import WeekdaySelector from './WeekdaySelector';

const FrequencySelector = ({ 
  frequencyType, 
  selectedDays, 
  onFrequencyTypeChange,
  onDayToggle 
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '0.875rem',
          color: 'text.primary',
          mb: 1.5
        }}
      >
        FREQUENCY
      </Typography>
      <ToggleButtonGroup
        value={frequencyType}
        exclusive
        onChange={(e, value) => value && onFrequencyTypeChange(value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <ToggleButton
          value="Daily"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            border: '3px solid black',
            '&.Mui-selected': {
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.main'
              }
            }
          }}
        >
          DAILY
        </ToggleButton>
        <ToggleButton
          value="Specific Days"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            border: '3px solid black',
            '&.Mui-selected': {
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.main'
              }
            }
          }}
        >
          SPECIFIC DAYS
        </ToggleButton>
      </ToggleButtonGroup>

      {frequencyType === 'Specific Days' && (
        <WeekdaySelector
          selectedDays={selectedDays}
          onDayToggle={onDayToggle}
        />
      )}
    </Box>
  );
};

export default FrequencySelector;
