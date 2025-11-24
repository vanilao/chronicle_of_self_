import React from 'react';
import { Box, Typography } from '@mui/material';
import { Sparkles } from 'lucide-react';
import PersonalizationStep from './form/PersonalizationStep';

const PersonalizationSection = ({
  formData,
  onIconSelect,
  onIconColorChange,
  onIconSkip,
  handleNotificationToggle,
  handleNotificationTimeChange,
  baseXp,
  bonusMultiplier,
  xpReward,
  userArchetypeCategory,
  userArchetype
}) => {
  return (
    <Box sx={{
      p: 2,
      borderRadius: 1,
      bgcolor: 'background.paper',
      boxShadow: '1px 1px 0px rgba(0,0,0,0.1)'
    }}>
      <Typography
        component="span"
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '0.875rem',
          color: 'text.primary',
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          textTransform: 'uppercase',
          letterSpacing: 1
        }}
      >
        <Sparkles size={16} />
        PERSONALIZATION
        <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'secondary.main' }} />
      </Typography>
      
      <PersonalizationStep
        formData={formData}
        onIconSelect={onIconSelect}
        onIconColorChange={onIconColorChange}
        onIconSkip={onIconSkip}
        handleNotificationToggle={handleNotificationToggle}
        handleNotificationTimeChange={handleNotificationTimeChange}
        baseXp={baseXp}
        bonusMultiplier={bonusMultiplier}
        xpReward={xpReward}
        userArchetypeCategory={userArchetypeCategory}
        userArchetype={userArchetype}
      />
    </Box>
  );
};

export default PersonalizationSection;
