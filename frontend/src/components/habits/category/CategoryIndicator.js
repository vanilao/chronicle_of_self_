import React from 'react';
import { Box } from '@mui/material';
import { getCategoryConfig } from '../../../config/categories';

const CategoryIndicator = ({ category }) => {
  // Show black color for "All" category
  if (category === 'All') {
    return (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: 'text.primary',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.2)',
          }
        }}
      />
    );
  }
  
  const config = getCategoryConfig(category);
  const Icon = config.icon;
  
  return (
    <Icon
      sx={{
        fontSize: 18,
        color: config.color,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
          color: config.borderColor
        }
      }}
    />
  );
};

export default CategoryIndicator;
