import React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <ToggleButtonGroup
      value={selectedCategory}
      exclusive
      onChange={(e, value) => value && onCategoryChange(value)}
      sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
    >
      {categories.map((category) => (
        <ToggleButton
          key={category}
          value={category}
          sx={{
            px: 2,
            py: 1,
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.875rem',
            border: '3px solid black',
            borderRadius: '8px !important',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            bgcolor: selectedCategory === category ? 'text.primary' : 'background.default',
            color: selectedCategory === category ? 'background.default' : 'text.primary',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
              transform: 'translate(2px, 2px)',
              bgcolor: selectedCategory === category ? 'text.primary' : 'background.default',
            },
            '&:active': {
              boxShadow: '0px 0px 0px rgba(0,0,0,1)',
              transform: 'translate(4px, 4px)',
            },
            '&.Mui-selected': {
              bgcolor: 'text.primary',
              color: 'background.default',
              '&:hover': {
                bgcolor: 'text.primary',
                boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                transform: 'translate(2px, 2px)',
              },
              '&:active': {
                boxShadow: '0px 0px 0px rgba(0,0,0,1)',
                transform: 'translate(4px, 4px)',
              }
            }
          }}
        >
          {category}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CategoryFilter;
