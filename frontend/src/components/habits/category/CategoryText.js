import React from 'react';
import { Typography } from '@mui/material';
import { getCategoryConfig } from '../../../config/categories';

const CategoryText = ({ category, isSelected }) => {
  const config = getCategoryConfig(category);
  
  return (
    <Typography
      sx={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontWeight: 600,
        color: isSelected ? config.color : 'text.primary',
        transition: 'all 0.2s ease-in-out',
        flex: 1
      }}
    >
      {category}
    </Typography>
  );
};

export default CategoryText;
