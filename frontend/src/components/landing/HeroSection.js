import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  FlashOn,
  EmojiEvents,
  LocalFireDepartment
} from '@mui/icons-material';

const HeroSection = () => {
  return (
    <Box component="section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Grid container spacing={6} alignItems="center">
        {/* Left Side - Text Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box className="space-y-6">
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: { xs: '3rem', sm: '3.75rem', lg: '4.5rem' },
                color: 'text.primary',
                lineHeight: 1.1
              }}
            >
              LEVEL UP
              <br />
              <Box component="span" sx={{ color: 'primary.main' }}>YOUR LIFE</Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '1.125rem',
                color: 'text.secondary',
                lineHeight: 1.7
              }}
            >
              Turn boring habits into epic quests. Earn XP, unlock achievements, and watch yourself grow into the hero of your own story.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, pt: 2 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<FlashOn />}
                sx={{ px: 4, py: 2, fontSize: '1.125rem' }}
              >
                START FREE
              </Button>
              <Button
                component="a"
                href="#features"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'background.paper' }
                }}
              >
                LEARN MORE
              </Button>
            </Box>

            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 4, pt: 4 }}>
              <Box>
                <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.875rem', color: 'text.primary' }}>
                  1K+
                </Typography>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.secondary' }}>
                  Users
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.875rem', color: 'text.primary' }}>
                  50K+
                </Typography>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.secondary' }}>
                  Habits Completed
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.875rem', color: 'text.primary' }}>
                  4.9★
                </Typography>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.secondary' }}>
                  Rating
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Preview Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: 'relative' }}>
            {/* Decorative Elements */}
            <Box sx={{ position: 'absolute', top: -16, right: -16, width: 128, height: 128, bgcolor: 'tertiary.main', borderRadius: '50%', opacity: 0.2, filter: 'blur(48px)' }} />
            <Box sx={{ position: 'absolute', bottom: -16, left: -16, width: 160, height: 160, bgcolor: 'primary.main', borderRadius: '50%', opacity: 0.2, filter: 'blur(48px)' }} />

            {/* Main Preview Card */}
            <Card sx={{ position: 'relative' }}>
              <CardContent sx={{ p: 4 }} className="space-y-4">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.secondary' }}>
                      Level 12
                    </Typography>
                    <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
                      WANDERER
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: 'primary.main', p: 1.5, borderRadius: 2, border: '3px solid black', boxShadow: '4px 4px 0px rgba(0,0,0,1)' }}>
                    <EmojiEvents sx={{ fontSize: 32, color: 'text.primary' }} />
                  </Box>
                </Box>

                {/* XP Bar */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.primary' }}>
                      1,850 / 2,500 XP
                    </Typography>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.secondary' }}>
                      74%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={74}
                    sx={{
                      height: 16,
                      borderRadius: 2,
                      border: '3px solid black',
                      bgcolor: 'background.default',
                      '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' }
                    }}
                  />
                </Box>

                {/* Today's Habits Preview */}
                <Box className="space-y-2">
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.875rem', color: 'text.primary' }}>
                    TODAY'S QUESTS
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.default', p: 1.5, borderRadius: 2, border: '2px solid black' }}>
                    <Box sx={{ width: 24, height: 24, bgcolor: 'tertiary.main', border: '2px solid black', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: '0.75rem' }}>✓</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.primary', flex: 1, textDecoration: 'line-through', opacity: 0.6 }}>
                      Morning Workout
                    </Typography>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                      +20 XP
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.default', p: 1.5, borderRadius: 2, border: '2px solid black' }}>
                    <Box sx={{ width: 24, height: 24, bgcolor: 'background.default', border: '2px solid black', borderRadius: 1 }} />
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.primary', flex: 1 }}>
                      Read for 30min
                    </Typography>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                      +15 XP
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.default', p: 1.5, borderRadius: 2, border: '2px solid black' }}>
                    <Box sx={{ width: 24, height: 24, bgcolor: 'background.default', border: '2px solid black', borderRadius: 1 }} />
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.primary', flex: 1 }}>
                      Meditation
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocalFireDepartment sx={{ fontSize: 16, color: '#f97316' }} />
                      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                        7 days
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
