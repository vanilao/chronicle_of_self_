import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import {
  FlashOn,
  LocalFireDepartment,
  GpsFixed,
  TrendingUp
} from '@mui/icons-material';

const KeyStatsGrid = ({ stats }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card sx={{ bgcolor: 'primary.main' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <FlashOn sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                TOTAL XP
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
              {stats.totalXPEarned}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card sx={{ bgcolor: 'secondary.main' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <LocalFireDepartment sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                LONGEST STREAK
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
              {stats.longestStreak}
            </Typography>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
              days in a row
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card sx={{ bgcolor: 'tertiary.main' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <GpsFixed sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                COMPLETIONS
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
              {stats.totalCompletions}
            </Typography>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
              all time
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card sx={{ border: '3px solid', borderColor: 'primary.main' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <TrendingUp sx={{ fontSize: 24, color: 'primary.main' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                AVG. RATE
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
              {Math.round(stats.completionRate)}%
            </Typography>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
              last 30 days
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KeyStatsGrid;
