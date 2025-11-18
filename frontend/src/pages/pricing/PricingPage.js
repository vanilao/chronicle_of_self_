import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip
} from '@mui/material';
import {
  Check,
  Star,
  FlashOn
} from '@mui/icons-material';

const PricingPage = () => {
  const plans = [
    {
      name: 'FREE',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Unlimited habits',
        'XP & leveling system',
        'All 4 archetypes',
        'Basic achievements',
        'Streak tracking',
        '7-day history',
        'Local storage'
      ],
      buttonText: 'START FREE',
      buttonLink: '/register',
      highlighted: false,
      color: 'background.paper'
    },
    {
      name: 'PRO',
      price: '$5',
      period: '/month',
      description: 'For serious adventurers',
      features: [
        'Everything in Free',
        'Unlimited history',
        'Advanced analytics',
        'Cloud sync',
        'All achievements',
        'Custom themes',
        'Priority support',
        'Export data'
      ],
      buttonText: 'COMING SOON',
      buttonLink: '#',
      highlighted: true,
      color: 'secondary.main',
      badge: 'POPULAR'
    },
    {
      name: 'TEAM',
      price: '$12',
      period: '/user/month',
      description: 'For groups & families',
      features: [
        'Everything in Pro',
        'Team dashboards',
        'Shared challenges',
        'Group leaderboards',
        'Admin controls',
        'Team analytics',
        'Dedicated support'
      ],
      buttonText: 'COMING SOON',
      buttonLink: '#',
      highlighted: false,
      color: 'background.paper'
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
            PRICING
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
            Start free and upgrade when you're ready. No credit card required.
          </Typography>
        </Box>
      </Box>

      {/* Pricing Cards */}
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: plan.color,
                  position: 'relative',
                  transform: plan.highlighted ? 'scale(1.05)' : 'none',
                  zIndex: plan.highlighted ? 1 : 0
                }}
              >
                {plan.badge && (
                  <Chip
                    label={plan.badge}
                    icon={<Star sx={{ fontSize: 14 }} />}
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 700,
                      fontSize: '0.625rem',
                      bgcolor: 'primary.main',
                      border: '2px solid black',
                      px: 1
                    }}
                  />
                )}
                <CardContent sx={{ p: 4 }} className="space-y-4">
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary',
                        mb: 1
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                      <Typography
                        sx={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '3rem',
                          color: 'text.primary'
                        }}
                      >
                        {plan.price}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.875rem',
                          color: 'text.secondary',
                          ml: 0.5
                        }}
                      >
                        {plan.period}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                        mt: 1
                      }}
                    >
                      {plan.description}
                    </Typography>
                  </Box>

                  <Box className="space-y-2" sx={{ py: 2 }}>
                    {plan.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5
                        }}
                      >
                        <Check sx={{ fontSize: 16, color: 'tertiary.main' }} />
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: 'text.primary'
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    component={plan.buttonLink !== '#' ? Link : 'button'}
                    to={plan.buttonLink !== '#' ? plan.buttonLink : undefined}
                    variant="contained"
                    fullWidth
                    disabled={plan.buttonLink === '#'}
                    startIcon={plan.name === 'FREE' ? <FlashOn /> : null}
                    sx={{
                      py: 1.5,
                      bgcolor: plan.highlighted ? 'text.primary' : 'primary.main',
                      color: plan.highlighted ? 'background.default' : 'text.primary',
                      '&:hover': {
                        bgcolor: plan.highlighted ? 'text.primary' : 'primary.main'
                      },
                      '&:disabled': {
                        bgcolor: 'background.default',
                        color: 'text.secondary'
                      }
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 12,
          borderTop: '3px solid black'
        }}
      >
        <Box className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '2rem',
              color: 'text.primary',
              mb: 6,
              textAlign: 'center'
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </Typography>

          <Box className="space-y-4">
            {[
              {
                q: 'Is the free plan really free?',
                a: 'Yes! The free plan includes unlimited habits, full XP system, all archetypes, and basic features. No credit card required.'
              },
              {
                q: 'Can I upgrade later?',
                a: 'Absolutely. You can upgrade to Pro or Team at any time. Your data and progress will be preserved.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We will accept all major credit cards, PayPal, and Apple Pay when Pro plans launch.'
              },
              {
                q: 'Is there a mobile app?',
                a: 'Currently web-only, but the app is fully responsive and works great on mobile browsers. Native apps coming soon!'
              }
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '1.125rem',
                      color: 'text.primary',
                      mb: 1
                    }}
                  >
                    {faq.q}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      color: 'text.secondary'
                    }}
                  >
                    {faq.a}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingPage;
