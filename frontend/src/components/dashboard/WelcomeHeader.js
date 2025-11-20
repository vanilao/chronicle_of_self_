import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const WelcomeHeader = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Box sx={{ mb: 4 }} className="space-y-4">
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'VT323, monospace',
            fontSize: { xs: '2.5rem', md: '3rem' },
            color: 'text.primary',
            mb: 1
          }}
        >
          WELCOME BACK, {user.username?.toUpperCase() || 'ADVENTURER'}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'text.secondary'
          }}
        >
          Level {user.level ?? 0} • {user.title ?? 'Explorer'} • {user.archetype ?? 'Unassigned'}
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                color: 'text.secondary'
              }}
            >
              LEVEL PROGRESS
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                color: 'text.primary'
              }}
            >
              {user.currentXP ?? 0} / {user.nextLevelXP ?? 100} XP
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.round(((user.currentXP ?? 0) / (user.nextLevelXP || 1)) * 100))}
            sx={{
              height: 16,
              borderRadius: 2,
              border: '3px solid black',
              bgcolor: 'background.default',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'secondary.main'
              }
            }}
          />
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
              color: 'text.secondary',
              textAlign: 'right',
              mt: 1
            }}
          >
            {Math.min(100, Math.round(((user.currentXP ?? 0) / (user.nextLevelXP || 1)) * 100))}% to next level
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WelcomeHeader;
