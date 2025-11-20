import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

const HabitFilters = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  dayFilterOptions = [],
  selectedDayFilter,
  onDayFilterChange
}) => {
  if (!categories.length && !dayFilterOptions.length) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
      {categories.length > 0 && (
        <ToggleButtonGroup
          value={selectedCategory}
          exclusive
          onChange={(e, value) => value && onCategoryChange?.(value)}
          sx={{ flexWrap: 'wrap', gap: 1 }}
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
                opacity: selectedCategory === category ? 1 : 0.7,
                '&:hover': {
                  opacity: 1,
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
                  opacity: 1,
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
      )}

      {dayFilterOptions.length > 0 && (
        <ToggleButtonGroup
          value={selectedDayFilter}
          exclusive
          onChange={(e, value) => value && onDayFilterChange?.(value)}
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {dayFilterOptions.map(option => (
            <ToggleButton
              key={option}
              value={option}
              sx={{
                px: 1.5,
                py: 1,
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: '3px solid black',
                borderRadius: '8px !important',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                bgcolor: selectedDayFilter === option ? 'text.primary' : 'background.default',
                color: selectedDayFilter === option ? 'background.default' : 'text.primary',
                opacity: selectedDayFilter === option ? 1 : 0.7,
                '&:hover': {
                  opacity: 1,
                  boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                  transform: 'translate(2px, 2px)',
                  bgcolor: selectedDayFilter === option ? 'text.primary' : 'background.default',
                },
                '&:active': {
                  boxShadow: '0px 0px 0px rgba(0,0,0,1)',
                  transform: 'translate(4px, 4px)',
                },
                '&.Mui-selected': {
                  bgcolor: 'text.primary',
                  color: 'background.default',
                  opacity: 1,
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
              {option.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </Box>
  );
};

export default HabitFilters;
