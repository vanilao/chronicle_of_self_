import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import {
  GpsFixed,
  FlashOn,
  EmojiEvents
} from '@mui/icons-material';

const StatsGrid = ({ stats }) => {
  if (!stats || stats.totalHabits === 0) return null;

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ bgcolor: 'primary.main' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <GpsFixed sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                TODAY'S PROGRESS
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: '2.5rem',
                color: 'text.primary'
              }}
            >
              {stats.completedToday}/{stats.totalHabits}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: 'text.primary',
                opacity: 0.8
              }}
            >
              Habits Completed
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ bgcolor: 'secondary.main' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <FlashOn sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                XP EARNED
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: '2.5rem',
                color: 'text.primary'
              }}
            >
              {stats.xpEarnedToday}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: 'text.primary',
                opacity: 0.8
              }}
            >
              Experience Points
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={{ bgcolor: 'tertiary.main' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <EmojiEvents sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                COMPLETION RATE
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: '2.5rem',
                color: 'text.primary'
              }}
            >
              {stats.totalHabits > 0 ? Math.round((stats.completedToday / stats.totalHabits) * 100) : 0}%
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: 'text.primary',
                opacity: 0.8
              }}
            >
              Daily Success
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatsGrid;
