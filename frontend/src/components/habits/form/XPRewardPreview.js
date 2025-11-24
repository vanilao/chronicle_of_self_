import React from 'react';
import { Typography, Box } from '@mui/material';

const XPRewardPreview = ({ baseXp, bonusMultiplier, xpReward, userArchetypeCategory, selectedCategory, userArchetype }) => {
  const bonusActive = userArchetypeCategory && selectedCategory === userArchetypeCategory;

  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 1,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '0.75rem',
          color: 'text.primary',
          mb: 0.75
        }}
      >
        XP REWARD
      </Typography>
      <Box className="space-y-0.5">
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
          Base XP: {baseXp}
        </Typography>
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
          Class Bonus: {userArchetypeCategory
            ? bonusActive ? '+25% (matching)' : 'No bonus'
            : 'Select archetype for bonuses'}
        </Typography>
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', fontWeight: 700, color: 'text.primary' }}>
          Total: +{xpReward} XP
        </Typography>
      </Box>
    </Box>
  );
};

export default XPRewardPreview;
