import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  LinearProgress
} from '@mui/material';
import {
  Close,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';

const XPToast = () => {
  const { xpToast, dismissXpToast } = useHabits();
  const { user } = useAuth();
  const { settings } = useSettings();

  // Don't show if notifications are disabled in settings
  if (!xpToast || !settings.notifications) return null;

  const { amount, habitName } = xpToast;
  const isPositive = amount > 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 50,
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      <Paper
        sx={{
          p: 2,
          maxWidth: 320,
          border: '3px solid black',
          borderRadius: 2,
          boxShadow: '8px 8px 0px rgba(0,0,0,1)',
          bgcolor: isPositive ? 'secondary.main' : 'error.light'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Box
              sx={{
                bgcolor: isPositive ? 'background.default' : 'error.dark',
                p: 1,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)'
              }}
            >
              <Icon sx={{ fontSize: 20, color: isPositive ? 'text.primary' : 'error.contrastText' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.125rem',
                  color: isPositive ? 'text.primary' : 'error.contrastText'
                }}
              >
                {isPositive ? '+' : ''}{amount} XP
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.primary',
                  opacity: 0.8,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {habitName}
              </Typography>
              {user && (
                <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={((user.currentXP || 0) / (user.nextLevelXP || 100)) * 100}
                    sx={{
                      flex: 1,
                      height: 6,
                      borderRadius: 1,
                      border: '1px solid black',
                      bgcolor: 'background.default',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'primary.main'
                      }
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.625rem',
                      color: 'text.primary',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {user.currentXP}/{user.nextLevelXP}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <IconButton
            onClick={dismissXpToast}
            size="small"
            sx={{
              bgcolor: 'background.default',
              border: '3px solid black',
              borderRadius: 2,
              boxShadow: '4px 4px 0px rgba(0,0,0,1)',
              p: 0.5,
              '&:hover': {
                bgcolor: 'background.default'
              }
            }}
          >
            <Close sx={{ fontSize: 12 }} />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default XPToast;
