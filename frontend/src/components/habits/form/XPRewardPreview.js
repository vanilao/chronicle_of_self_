import React from 'react';
import { Typography, Box } from '@mui/material';

const XPRewardPreview = ({ baseXp, bonusMultiplier, xpReward, userArchetypeCategory, selectedCategory, userArchetype }) => {
  const bonusActive = userArchetypeCategory && selectedCategory === userArchetypeCategory;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '3px solid black',
        boxShadow: '4px 4px 0px rgba(0,0,0,1)',
        bgcolor: 'background.default'
      }}
    >
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '0.875rem',
          color: 'text.primary',
          mb: 1
        }}
      >
        XP REWARD
      </Typography>
      <Box className="space-y-1">
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
          Base XP: {baseXp}
        </Typography>
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
          Class Bonus: {userArchetypeCategory
            ? bonusActive ? '+25% (matching archetype)' : 'No bonus applied'
            : 'Select an archetype to unlock class bonuses'}
        </Typography>
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
          Total Reward: +{xpReward} XP
        </Typography>
      </Box>
    </Box>
  );
};

export default XPRewardPreview;
