import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { DIFFICULTY_LEVELS } from '../../../constants/habitConstants';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
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
        DIFFICULTY
      </Typography>
      <Grid container spacing={1.5} role="radiogroup" aria-label="Difficulty selection">
        {DIFFICULTY_LEVELS.map((diff) => {
          const isSelected = selectedDifficulty === diff.name;

          return (
            <Grid size={{ xs: 4 }} key={diff.name}>
              <Box
                onClick={() => onDifficultyChange(diff.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onDifficultyChange(diff.name);
                  }
                }}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Select ${diff.name} difficulty, ${diff.xp} XP`}
                tabIndex={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '3px solid black',
                  boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                  bgcolor: isSelected ? 'secondary.main' : 'background.default',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  outline: isSelected ? '4px solid' : 'none',
                  outlineColor: 'text.primary',
                  opacity: isSelected ? 1 : 0.7,
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    mb: 0.5
                  }}
                >
                  {diff.name.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary'
                  }}
                >
                  +{diff.xp} XP
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DifficultySelector;
