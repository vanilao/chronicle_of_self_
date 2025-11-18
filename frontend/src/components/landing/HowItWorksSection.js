import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { GpsFixed, FlashOn, EmojiEvents } from '@mui/icons-material';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: GpsFixed,
      number: '01',
      title: 'CREATE QUESTS',
      description: 'Set up your daily habits as quests. Choose difficulty, category, and schedule.',
      color: 'primary.main'
    },
    {
      icon: FlashOn,
      number: '02',
      title: 'EARN XP',
      description: 'Complete your habits to earn experience points and level up your character.',
      color: 'secondary.main'
    },
    {
      icon: EmojiEvents,
      number: '03',
      title: 'UNLOCK REWARDS',
      description: 'Maintain streaks, unlock achievements, and track your progress visually.',
      color: 'tertiary.main'
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        py: 10,
        borderTop: '3px solid black',
        borderBottom: '3px solid black'
      }}
    >
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'VT323, monospace',
            fontSize: { xs: '2.5rem', md: '3rem' },
            textAlign: 'center',
            color: 'text.primary',
            mb: 2
          }}
        >
          HOW IT WORKS
        </Typography>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            textAlign: 'center',
            color: 'text.secondary',
            mb: 8,
            maxWidth: '42rem',
            mx: 'auto'
          }}
        >
          Three simple steps to transform your daily routine into an epic adventure
        </Typography>

        <Grid container spacing={4}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={step.number}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }} className="space-y-4">
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <Box
                        sx={{
                          bgcolor: step.color,
                          p: 2,
                          borderRadius: 2,
                          border: '3px solid black',
                          boxShadow: '4px 4px 0px rgba(0,0,0,1)'
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: 'text.primary' }} />
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '3rem',
                          color: 'text.secondary',
                          opacity: 0.3
                        }}
                      >
                        {step.number}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary'
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: 'text.secondary'
                      }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default HowItWorksSection;
