import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography
} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';

const Last7DaysChart = ({ data }) => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <CalendarMonth sx={{ fontSize: 24, color: 'text.primary' }} />
          <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
            LAST 7 DAYS
          </Typography>
        </Box>

        <Grid container spacing={1}>
          {data.map((day, index) => (
            <Grid size={{ xs: 12 / 7 }} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
                  {day.dayName}
                </Typography>
                <Box sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 2, border: '3px solid black', boxShadow: '4px 4px 0px rgba(0,0,0,1)', mb: 1 }}>
                  <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
                    {day.completedCount}
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
                    / {day.totalHabits}
                  </Typography>
                </Box>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'primary.main', fontWeight: 700 }}>
                  +{day.xpEarned} XP
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Last7DaysChart;
