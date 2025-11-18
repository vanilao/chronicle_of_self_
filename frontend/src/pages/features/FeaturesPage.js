import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import {
  GpsFixed,
  FlashOn,
  EmojiEvents,
  TrendingUp,
  CalendarMonth,
  LocalFireDepartment,
  Palette,
  Speed,
  CloudSync
} from '@mui/icons-material';

const FeaturesPage = () => {
  const features = [
    {
      icon: GpsFixed,
      title: 'HABIT TRACKING',
      description: 'Create custom habits with categories, difficulty levels, and flexible scheduling. Track daily, weekly, or specific days.',
      color: 'primary.main'
    },
    {
      icon: FlashOn,
      title: 'XP SYSTEM',
      description: 'Earn experience points for completing habits. Harder habits = more XP. Level up and unlock new titles.',
      color: 'secondary.main'
    },
    {
      icon: EmojiEvents,
      title: 'ACHIEVEMENTS',
      description: 'Unlock achievements as you progress. From first habit to 30-day streaks, celebrate every milestone.',
      color: 'tertiary.main'
    },
    {
      icon: LocalFireDepartment,
      title: 'STREAK TRACKING',
      description: 'Build momentum with streak tracking. See your consistency and never break the chain.',
      color: '#f97316'
    },
    {
      icon: Palette,
      title: 'CHARACTER CLASSES',
      description: 'Choose your archetype: Warrior, Sage, Monk, or Artisan. Get +25% XP bonus for matching habits.',
      color: 'primary.main'
    },
    {
      icon: TrendingUp,
      title: 'PROGRESS ANALYTICS',
      description: 'Visual heatmaps, completion rates, and detailed stats. See your growth over time.',
      color: 'secondary.main'
    },
    {
      icon: CalendarMonth,
      title: 'FLEXIBLE SCHEDULING',
      description: 'Set habits for daily practice or specific days of the week. Your schedule, your rules.',
      color: 'tertiary.main'
    },
    {
      icon: Speed,
      title: 'LEVEL PROGRESSION',
      description: 'Dynamic leveling system with increasing XP requirements. Earn titles as you advance.',
      color: 'primary.main'
    },
    {
      icon: CloudSync,
      title: 'LOCAL STORAGE',
      description: 'Your data stays on your device. No account required to start. Privacy first.',
      color: 'secondary.main'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 10,
          borderBottom: '3px solid black'
        }}
      >
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: { xs: '3rem', md: '4rem' },
              color: 'text.primary',
              mb: 3
            }}
          >
            FEATURES
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '1.125rem',
              color: 'text.secondary',
              maxWidth: '42rem',
              mx: 'auto'
            }}
          >
            Everything you need to transform your habits into an epic adventure. Level up your life with gamified habit tracking.
          </Typography>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }} className="space-y-4">
                    <Box
                      sx={{
                        bgcolor: feature.color,
                        p: 2,
                        borderRadius: 2,
                        border: '3px solid black',
                        boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                        width: 'fit-content'
                      }}
                    >
                      <Icon sx={{ fontSize: 32, color: 'text.primary' }} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 12,
          borderTop: '3px solid black'
        }}
      >
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 3
            }}
          >
            READY TO START YOUR ADVENTURE?
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'text.secondary',
              mb: 4
            }}
          >
            Join thousands of adventurers transforming their lives
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              GET STARTED FREE
            </Button>
            <Button
              component={Link}
              to="/pricing"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: 'background.default',
                color: 'text.primary',
                '&:hover': { bgcolor: 'background.default' }
              }}
            >
              VIEW PRICING
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesPage;
