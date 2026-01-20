import React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);

  const handleCategoryChange = (e, value) => {
    if (value) {
      soundManager.playClick1();
      onCategoryChange(value);
    }
  };
  return (
    <ToggleButtonGroup
      value={selectedCategory}
      exclusive
      onChange={handleCategoryChange}
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
            '&.Mui-selected': {
              bgcolor: 'text.primary',
              color: 'background.default',
              '&:hover': {
                bgcolor: 'text.primary'
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
