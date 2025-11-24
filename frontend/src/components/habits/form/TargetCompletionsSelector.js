import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel
} from '@mui/material';
import { Repeat } from '@mui/icons-material';
import { FREQUENCY_TYPES } from '../../../constants/habitConstants';

const TargetCompletionsSelector = ({ value, onChange, frequencyType }) => {
  // Show for daily and weekly habits (when specific days are selected)
  if (frequencyType !== FREQUENCY_TYPES.DAILY && frequencyType !== FREQUENCY_TYPES.WEEKLY) {
    return null;
  }

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value) || 1;
    // More reasonable limits: 1-10 instead of 1-99
    const clampedValue = Math.max(1, Math.min(10, newValue));
    onChange(clampedValue);
  };

  const getLabel = (value) => {
    if (frequencyType === FREQUENCY_TYPES.DAILY) {
      return value === 1 ? 'Once per day' : `${value} times per day`;
    } else if (frequencyType === FREQUENCY_TYPES.WEEKLY) {
      return value === 1 ? 'Once per selected day' : `${value} times per selected day`;
    }
    return value === 1 ? 'Once' : `${value} times`;
  };

  const getHelperText = () => {
    if (value > 5) {
      return 'High target - make sure this is achievable!';
    }
    if (value === 1) {
      return 'Perfect for building consistency';
    }
    return 'Good for building strong habits';
  };

  const getError = () => {
    if (value > 8) {
      return 'This target might be too ambitious. Consider starting smaller.';
    }
    return null;
  };

  return (
    <Box sx={{ mb: 1.5 }}>
      <FormControl component="fieldset" fullWidth sx={{ p: 1, border: '2px solid #e0e0e0', borderRadius: 1, bgcolor: 'background.paper' }}>
        <FormLabel
          component="legend"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: 'text.primary',
            mb: 0.75,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Repeat sx={{ fontSize: 16 }} />
          TARGET
        </FormLabel>
        
        <TextField
          type="number"
          value={value}
          onChange={handleChange}
          inputProps={{
            min: 1,
            max: 10,
            step: 1
          }}
          size="small"
          fullWidth
          helperText={getHelperText()}
          error={!!getError()}
          FormHelperTextProps={{
            sx: {
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.625rem',
              color: getError() ? 'error.main' : 'text.secondary'
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '1rem',
              border: '2px solid black',
              borderRadius: 1,
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
              '&:hover': {
                boxShadow: '1px 1px 0px rgba(0,0,0,1)',
              },
              '&.Mui-focused': {
                boxShadow: '1px 1px 0px rgba(0,0,0,1)',
                border: '2px solid',
                borderColor: 'primary.main'
              },
              '& input': {
                textAlign: 'center',
                px: 1.5
              }
            }
          }}
        />
        
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.625rem',
            color: 'text.secondary',
            mt: 0.75,
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          {getLabel(value)}
        </Typography>
      </FormControl>
    </Box>
  );
};

export default TargetCompletionsSelector;
