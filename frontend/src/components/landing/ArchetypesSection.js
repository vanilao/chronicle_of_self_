import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { FitnessCenter, MenuBook, Favorite, Palette } from '@mui/icons-material';

const ArchetypesSection = () => {
  const archetypes = [
    {
      name: 'WARRIOR',
      icon: FitnessCenter,
      subtitle: 'Master physical discipline',
      description: 'Perfect for fitness enthusiasts and athletes. Build strength and endurance.',
      bonus: '+25% BODY XP',
      bgColor: 'secondary.main'
    },
    {
      name: 'SAGE',
      icon: MenuBook,
      subtitle: 'Cultivate wisdom',
      description: 'Ideal for learners and thinkers. Master knowledge and mental clarity.',
      bonus: '+25% MIND XP',
      bgColor: 'primary.main'
    },
    {
      name: 'MONK',
      icon: Favorite,
      subtitle: 'Find inner peace',
      description: 'Great for mindfulness seekers. Develop meditation and spiritual practices.',
      bonus: '+25% SPIRIT XP',
      bgColor: 'tertiary.main'
    },
    {
      name: 'ARTISAN',
      icon: Palette,
      subtitle: 'Express creativity',
      description: 'Built for creators and makers. Nurture artistic and creative pursuits.',
      bonus: '+25% CREATIVE XP',
      bgColor: 'background.paper'
    }
  ];

  return (
    <Box component="section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'VT323, monospace',
            fontSize: { xs: '2.5rem', md: '3rem' },
            color: 'text.primary',
            mb: 2
          }}
        >
          CHOOSE YOUR CLASS
        </Typography>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'text.secondary'
          }}
        >
          Each archetype gives you +25% XP bonus for specific habit categories
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {archetypes.map((archetype) => {
          const Icon = archetype.icon;
          return (
            <Grid size={{ xs: 12, md: 6 }} key={archetype.name}>
              <Card
                sx={{
                  bgcolor: archetype.bgColor,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }} className="space-y-4">
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                      <Box
                        sx={{
                          bgcolor: 'background.default',
                          p: 1.5,
                          borderRadius: 2,
                          border: '3px solid black',
                          boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                          width: 'fit-content',
                          mb: 2
                        }}
                      >
                        <Icon sx={{ fontSize: 40, color: 'text.primary' }} />
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '1.875rem',
                          color: 'text.primary',
                          mb: 1
                        }}
                      >
                        {archetype.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.875rem',
                          color: 'text.primary',
                          opacity: 0.9
                        }}
                      >
                        {archetype.subtitle}
                      </Typography>
                    </Box>
                    <Chip
                      label={archetype.bonus}
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        bgcolor: 'background.default',
                        border: '2px solid black',
                        borderRadius: '9999px'
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      color: 'text.primary'
                    }}
                  >
                    {archetype.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ArchetypesSection;
