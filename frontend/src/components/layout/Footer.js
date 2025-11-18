import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import { SportsEsports } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '3px solid black',
        py: 6
      }}
    >
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box className="space-y-4">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    p: 1,
                    borderRadius: 2,
                    border: '2px solid black'
                  }}
                >
                  <SportsEsports sx={{ fontSize: 20, color: 'text.primary' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '1.25rem',
                    color: 'text.primary'
                  }}
                >
                  CHRONICLE
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  color: 'text.secondary'
                }}
              >
                Level up your life through gamified habit tracking.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                color: 'text.primary',
                mb: 2
              }}
            >
              Product
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }} className="space-y-2">
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Roadmap
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                color: 'text.primary',
                mb: 2
              }}
            >
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }} className="space-y-2">
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Contact
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                color: 'text.primary',
                mb: 2
              }}
            >
              Legal
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }} className="space-y-2">
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Security
                </Link>
              </li>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '2px solid black', mt: 4, pt: 4, textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.875rem',
              color: 'text.secondary'
            }}
          >
            © 2025 Chronicle of Self. Built with love for habit builders.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
