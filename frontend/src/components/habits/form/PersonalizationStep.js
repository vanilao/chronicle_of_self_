import React from 'react';
import { Box, Typography } from '@mui/material';
import { XPRewardPreview, NotificationSettings } from './index';

const PersonalizationStep = ({
  formData,
  handleNotificationToggle,
  handleNotificationTimeChange,
  baseXp,
  bonusMultiplier,
  xpReward,
  userArchetypeCategory,
  userArchetype
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%', minHeight: '160px' }}>
      {/* XP Reward and Notifications - Side by Side */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 1
      }}>
        <Box>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 700,
              fontSize: '0.75rem',
              color: 'text.primary',
              mb: 0.5,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            Notifications
          </Typography>
          <NotificationSettings
            notificationsEnabled={formData.notificationsEnabled}
            notificationTime={formData.notificationTime}
            onNotificationToggle={handleNotificationToggle}
            onTimeChange={handleNotificationTimeChange}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 700,
              fontSize: '0.75rem',
              color: 'text.primary',
              mb: 0.5,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            XP Reward
          </Typography>
          <XPRewardPreview
            baseXp={baseXp}
            bonusMultiplier={bonusMultiplier}
            xpReward={xpReward}
            userArchetypeCategory={userArchetypeCategory}
            selectedCategory={formData.category}
            userArchetype={userArchetype}
          />
        </Box>
      </Box>

      {/* Icon Selector - Simple */}
      {/* <Box>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: 'text.primary',
            mb: 0.75,
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}
        >
          Custom Icon
        </Typography>
        <IconSelector
          selectedIcon={formData.customIcon}
          selectedColor={formData.iconColor}
          onIconSelect={onIconSelect}
          onColorChange={onIconColorChange}
          onSkip={onIconSkip}
        />
      </Box> */}
    </Box>
  );
};

export default PersonalizationStep;
