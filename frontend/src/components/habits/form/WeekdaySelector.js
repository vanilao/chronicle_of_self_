import React from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';

const WeekdaySelector = ({ selectedDays, onDayToggle }) => {
  const weekdayOptions = [
    { key: 'Mon', label: 'Mon' },
    { key: 'Tue', label: 'Tue' },
    { key: 'Wed', label: 'Wed' },
    { key: 'Thu', label: 'Thu' },
    { key: 'Fri', label: 'Fri' },
    { key: 'Sat', label: 'Sat' },
    { key: 'Sun', label: 'Sun' }
  ];

  return (
    <Box>
      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
        Select the days you want this habit to run.
      </Typography>
      <Grid container spacing={1}>
        {weekdayOptions.map(day => {
          const isSelected = selectedDays.includes(day.key);
          return (
            <Grid size={{ xs: 3, sm: 12 / 7 }} key={day.key}>
              <Button
                onClick={() => onDayToggle(day.key)}
                fullWidth
                variant={isSelected ? "contained" : "outlined"}
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  py: 1,
                  border: '3px solid black',
                  bgcolor: isSelected ? 'primary.main' : 'background.default',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.main' : 'background.default'
                  }
                }}
              >
                {day.label}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WeekdaySelector;
