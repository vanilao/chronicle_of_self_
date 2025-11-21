import React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Box
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
          key={category.name}
          value={category.name}
          sx={{
            px: 2,
            py: 1,
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.875rem',
            border: '3px solid black',
            borderRadius: '8px !important',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            bgcolor: selectedCategory === category.name ? 'text.primary' : 'background.default',
            color: selectedCategory === category.name ? 'background.default' : 'text.primary',
            opacity: selectedCategory === category.name ? 1 : 0.7,
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
              transform: 'translate(2px, 2px)',
              bgcolor: selectedCategory === category.name ? 'text.primary' : 'background.default',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{category.name}</span>
            <Chip
              label={category.count}
              size="small"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                height: 18,
                minWidth: 20,
                bgcolor: selectedCategory === category.name ? 'background.default' : 'text.primary',
                color: selectedCategory === category.name ? 'text.primary' : 'background.default',
                border: '1px solid currentColor',
                fontWeight: 700
              }}
            />
          </Box>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CategoryFilter;
