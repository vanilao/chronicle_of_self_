import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  CheckCircle,
  LocalFireDepartment,
  WorkspacePremium,
  FlashOn,
  TrendingUp
} from '@mui/icons-material';

const RecentAchievements = ({ achievements }) => {
  const iconMap = {
    Star,
    CheckCircle,
    LocalFireDepartment,
    EmojiEvents,
    WorkspacePremium,
    FlashOn,
    TrendingUp
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: 'VT323, monospace',
          fontSize: '1.875rem',
          color: 'text.primary',
          mb: 3
        }}
      >
        RECENT ACHIEVEMENTS
      </Typography>
      {achievements.length > 0 ? (
        <Grid container spacing={2}>
          {achievements.map((achievement) => {
            const IconComponent = iconMap[achievement.icon] || EmojiEvents;
            return (
              <Grid size={{ xs: 12, sm: 4 }} key={achievement.id}>
                <Card sx={{ bgcolor: 'secondary.main' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <IconComponent sx={{ fontSize: 32, color: 'text.primary', mb: 1 }} />
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.125rem',
                        color: 'text.primary',
                        mb: 0.5
                      }}
                    >
                      {achievement.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        color: 'text.primary',
                        opacity: 0.8
                      }}
                    >
                      {achievement.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Card>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <EmojiEvents sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 1.5 }} />
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                color: 'text.secondary'
              }}
            >
              Complete habits to unlock achievements!
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default RecentAchievements;
