import React from 'react';
import { Chip } from '@mui/material';

const CategoryCount = ({ count, category }) => {
  // Don't show count for "All" category since it's always the total
  if (category === 'All') {
    return null;
  }
  
  return (
    <Chip
      label={count}
      size="small"
      sx={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '0.625rem',
        height: 18,
        minWidth: 20,
        bgcolor: 'background.default',
        color: 'text.primary',
        border: '1px solid black',
        fontWeight: 700,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: 'grey.200',
          transform: 'scale(1.05)'
        }
      }}
    />
  );
};

export default CategoryCount;
