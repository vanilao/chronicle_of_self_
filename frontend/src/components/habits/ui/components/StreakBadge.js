import React from 'react';
import { Chip } from '@mui/material';
import { LocalFireDepartment } from '@mui/icons-material';

const StreakBadge = ({ streak }) => {
  if (streak <= 0) return null;

  return (
    <Chip
      icon={<LocalFireDepartment sx={{ fontSize: 10 }} />}
      label={`${streak} day${streak !== 1 ? 's' : ''}`}
      size="small"
      sx={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '0.625rem',
        height: 20,
        bgcolor: '#ffedd5',
        color: '#9a3412',
        border: '1px solid black',
        borderRadius: 1,
        '& .MuiChip-icon': {
          color: '#9a3412'
        }
      }}
    />
  );
};

export default StreakBadge;
