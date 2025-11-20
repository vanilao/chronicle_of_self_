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
        <Card sx={{ bgcolor: 'primary.main', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <FlashOn sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                TOTAL XP
              </Typography>
            </Box>
            <Box sx={{ minHeight: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {stats.totalXPEarned}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card sx={{ bgcolor: 'secondary.main', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <LocalFireDepartment sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                LONGEST STREAK
              </Typography>
            </Box>
            <Box sx={{ minHeight: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {stats.longestStreak}
              </Typography>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                days in a row
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card sx={{ bgcolor: 'tertiary.main', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <GpsFixed sx={{ fontSize: 24, color: 'text.primary' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                COMPLETIONS
              </Typography>
            </Box>
            <Box sx={{ minHeight: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {stats.totalCompletions}
              </Typography>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                all time
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card sx={{ border: '3px solid', borderColor: 'primary.main', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <TrendingUp sx={{ fontSize: 24, color: 'primary.main' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                AVG. RATE
              </Typography>
            </Box>
            <Box sx={{ minHeight: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {Math.round(stats.completionRate)}%
              </Typography>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                last 30 days
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KeyStatsGrid;
