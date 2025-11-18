import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper
} from '@mui/material';
import {
  EmojiEvents,
  Close,
  AutoAwesome,
  Star,
  FlashOn
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const LevelUpNotification = () => {
  const { levelUpNotification, dismissLevelUpNotification } = useAuth();

  if (!levelUpNotification) return null;

  const { newLevel, newTitle, levelsGained } = levelUpNotification;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 96,
        right: 16,
        zIndex: 50,
        animation: 'bounce 1s infinite'
      }}
    >
      <Paper
        sx={{
          background: 'linear-gradient(to bottom right, #FFB3D9, #B4F8C8)',
          p: 3,
          maxWidth: 400,
          border: '4px solid',
          borderColor: 'text.primary',
          borderRadius: 2,
          boxShadow: '8px 8px 0px rgba(0,0,0,1)'
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: 'text.primary',
                p: 1.5,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                animation: 'pulse 2s infinite'
              }}
            >
              <EmojiEvents sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.875rem',
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                LEVEL UP!
              </Typography>
              {levelsGained > 1 && (
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.primary',
                    opacity: 0.8
                  }}
                >
                  +{levelsGained} Levels!
                </Typography>
              )}
            </Box>
          </Box>
          <IconButton
            onClick={dismissLevelUpNotification}
            size="small"
            sx={{
              bgcolor: 'background.default',
              border: '3px solid black',
              borderRadius: 2,
              boxShadow: '4px 4px 0px rgba(0,0,0,1)',
              '&:hover': {
                bgcolor: 'background.default',
                transform: 'scale(1.1)'
              }
            }}
          >
            <Close sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Level Display */}
        <Box
          sx={{
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 2,
            border: '3px solid black',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
            <AutoAwesome sx={{ fontSize: 24, color: 'primary.main' }} />
            <Typography
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: '2.5rem',
                color: 'text.primary'
              }}
            >
              {newLevel}
            </Typography>
            <Star sx={{ fontSize: 24, color: 'secondary.main' }} />
          </Box>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'text.primary'
            }}
          >
            <Box component="span" sx={{ opacity: 0.6 }}>New Title:</Box>
            <br />
            <Box component="span" sx={{ fontWeight: 700, fontSize: '1rem' }}>{newTitle}</Box>
          </Typography>
        </Box>

        {/* Celebration Message */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 0.5
            }}
          >
            <FlashOn sx={{ fontSize: 16 }} />
            Amazing Progress!
            <FlashOn sx={{ fontSize: 16 }} />
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
              color: 'text.primary',
              opacity: 0.8
            }}
          >
            You're becoming a legend!
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LevelUpNotification;
