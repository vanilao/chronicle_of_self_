import React from 'react';
import { Grid, Typography, Chip, Box } from '@mui/material';
import { getCategoryConfig } from '../../../config/categories';
import { FitnessCenter, MenuBook, SelfImprovement, Palette } from '@mui/icons-material';

const CategorySelector = ({ 
  selectedCategory, 
  onCategoryChange, 
  userArchetypeCategory, 
  userArchetype 
}) => {
  const categories = [
    { name: 'Body', icon: FitnessCenter },
    { name: 'Mind', icon: MenuBook },
    { name: 'Spirit', icon: SelfImprovement },
    { name: 'Creative', icon: Palette }
  ];

  const bonusActive = userArchetypeCategory && selectedCategory === userArchetypeCategory;

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '0.875rem',
          color: 'text.primary',
          mb: 1.5
        }}
      >
        CATEGORY
      </Typography>
      <Grid container spacing={1.5}>
        {categories.map((cat) => {
          const config = getCategoryConfig(cat.name);
          const Icon = config.icon;
          const isSelected = selectedCategory === cat.name;
          const hasBonus = userArchetypeCategory && cat.name === userArchetypeCategory;

          return (
            <Grid size={{ xs: 6, md: 3 }} key={cat.name}>
              <Box
                onClick={() => onCategoryChange(cat.name)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `3px solid ${config.borderColor}`,
                  boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                  bgcolor: isSelected ? config.bgColor : 'background.default',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  outline: isSelected ? `4px solid ${config.color}` : 'none',
                  opacity: isSelected ? 1 : 0.8,
                  '&:hover': {
                    opacity: 1,
                    bgcolor: config.hoverBg,
                    transform: 'scale(1.05)',
                    boxShadow: '2px 2px 0px rgba(0,0,0,1)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Icon 
                    sx={{ 
                      fontSize: 32, 
                      color: isSelected ? config.color : 'text.secondary',
                      transition: 'all 0.2s ease-in-out'
                    }} 
                  />
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: isSelected ? config.color : 'text.primary',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {cat.name}
                  </Typography>
                  {hasBonus && (
                    <Chip
                      label="+25% XP"
                      size="small"
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.625rem',
                        bgcolor: config.bgColor,
                        color: config.color,
                        border: `1px solid ${config.borderColor}`,
                        height: 20,
                        fontWeight: 700
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      {userArchetypeCategory && (
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: 'text.secondary',
            mt: 1
          }}
        >
          {bonusActive
            ? `Matching your ${userArchetype || 'archetype'}! +25% XP applied.`
            : `Choose ${userArchetypeCategory} to earn +25% XP with your ${userArchetype || 'archetype'}.`}
        </Typography>
      )}
    </Box>
  );
};

export default CategorySelector;
