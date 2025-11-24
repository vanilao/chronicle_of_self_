import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';

const ScheduleTiming = ({ 
  formData, 
  handleChange,
  handleScheduleFrequencyChange,
  handleTimeOfDayChange,
  handleDayToggle,
  weekDays 
}) => {
  return (
    <Box sx={{
      p: 1,
      border: '2px dashed #e0e0e0',
      borderRadius: 1,
      bgcolor: 'background.paper',
      boxShadow: '1px 1px 0px rgba(0,0,0,0.1)'
    }}>
      <Typography sx={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontWeight: 700,
        fontSize: '0.625rem',
        textTransform: 'uppercase',
        letterSpacing: 1,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5
      }}>
        ⏰ SCHEDULE & TIMING
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
        {/* Frequency Type */}
        <FormControl fullWidth size="small">
          <InputLabel sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}>
            Frequency Type
          </InputLabel>
          <Select
            value={formData.scheduleFrequency || ''}
            onChange={handleScheduleFrequencyChange}
            label="Frequency Type"
            MenuProps={{
              sx: {
                zIndex: 14000
              }
            }}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.875rem'
            }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="weekdays">Weekdays</MenuItem>
            <MenuItem value="weekends">Weekends</MenuItem>
          </Select>
        </FormControl>

        {/* Time of Day */}
        <FormControl fullWidth size="small">
          <InputLabel sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}>
            Time of Day
          </InputLabel>
          <Select
            value={formData.timeOfDay || ''}
            onChange={handleTimeOfDayChange}
            label="Time of Day"
            MenuProps={{
              sx: {
                zIndex: 14000
              }
            }}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.875rem'
            }}
          >
            <MenuItem value="morning">Morning (6AM-12PM)</MenuItem>
            <MenuItem value="afternoon">Afternoon (12PM-6PM)</MenuItem>
            <MenuItem value="evening">Evening (6PM-12AM)</MenuItem>
            <MenuItem value="night">Night (12AM-6AM)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        {/* Days Selection */}
        <Box>
          <Typography sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.625rem',
            color: 'text.primary',
            mb: 0.75,
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}>
            Select Days
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {weekDays.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={formData.scheduleDays?.includes(day) || false}
                    onChange={() => handleDayToggle(day)}
                    size="small"
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1rem'
                      }
                    }}
                  />
                }
                label={
                  <Typography sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.625rem',
                    fontWeight: 600
                  }}>
                    {day}
                  </Typography>
                }
              />
            ))}
          </Box>
        </Box>

        {/* Daily Target */}
        <Box>
          <Typography sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.625rem',
            color: 'text.primary',
            mb: 0.75,
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}>
            Daily Target
          </Typography>
          <TextField
            type="number"
            value={formData.targetCompletions || 1}
            onChange={(e) => handleChange({ target: { name: 'targetCompletions', value: parseInt(e.target.value) || 1 } })}
            inputProps={{
              min: 1,
              max: 10,
              step: 1
            }}
            size="small"
            fullWidth
            helperText="Number of completions per day"
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  borderWidth: '1px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                  borderWidth: '1px'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '1px'
                },
                '& input': {
                  textAlign: 'center',
                  px: 1
                }
              },
              '& .MuiFormHelperText-root': {
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem'
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleTiming;
