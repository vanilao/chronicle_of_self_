import React from 'react';
import {
  Box,
  TextField,
  Typography
} from '@mui/material';
import IconSelector from '../IconSelector';

const FormFields = ({ formData, formErrors, handleChange, onIconSelect }) => {
  const handleIconColorChange = (color) => {
    handleChange({ target: { name: 'iconColor', value: color } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Name and Icon Row */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Name Field - Takes most space */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 700,
              fontSize: '0.75rem',
              color: 'text.primary',
              mb: 0.75,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g., Morning Workout"
            value={formData.name}
            onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
            error={!!formErrors.name}
            helperText={formErrors.name}
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
                }
              },
              '& .MuiFormHelperText-root': {
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem'
              }
            }}
          />
        </Box>

        {/* Icon Selector - Fixed width on the right */}
        <Box sx={{ width: 200 }}>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 700,
              fontSize: '0.75rem',
              color: 'text.primary',
              mb: 0.75,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            Icon
          </Typography>
          <IconSelector
            value={formData.customIcon}
            onChange={onIconSelect}
            size={16}
            color={formData.iconColor || '#666666'}
            onColorChange={handleIconColorChange}
          />
        </Box>
      </Box>

      {/* Description Field - Full width below */}
      <Box>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: 'text.primary',
            mb: 0.75,
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}
        >
          Description
        </Typography>
        <TextField
          fullWidth
          size="small"
          multiline
          rows={3}
          placeholder="Why is this important?"
          value={formData.description}
          onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value } })}
          error={!!formErrors.description}
          helperText={formErrors.description}
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
  );
};

export default FormFields;
