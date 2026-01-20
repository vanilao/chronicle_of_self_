import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { FlashOn } from '@mui/icons-material';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';

const CTASection = () => {
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);

  const handleClick = () => {
    soundManager.playClick1();
  };
  return (
    <Box component="section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`
              : `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.tertiary.main})`
        }}
      >
        <CardContent sx={{ p: { xs: 6, md: 8 }, textAlign: 'center' }}>
          {/* Decorative Background Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 256,
              height: 256,
              bgcolor: 'background.default',
              opacity: 0.1,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 256,
              height: 256,
              bgcolor: 'background.default',
              opacity: 0.1,
              borderRadius: '50%',
              transform: 'translate(50%, 50%)'
            }}
          />

          <Box sx={{ position: 'relative' }} className="space-y-6">
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'background.default',
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                mb: 2
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'text.primary'
                }}
              >
                FREE TO START
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: { xs: '2.5rem', md: '3.75rem' },
                color: 'text.primary',
                lineHeight: 1.1
              }}
            >
              START YOUR
              <br />
              ADVENTURE TODAY
            </Typography>

            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '1.125rem',
                color: 'text.primary',
                maxWidth: '42rem',
                mx: 'auto',
                opacity: 0.9
              }}
            >
              Join thousands of adventurers transforming their lives, one habit at a time. No credit card required.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center', pt: 2 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                startIcon={<FlashOn />}
                onClick={handleClick}
                sx={{
                  px: 5,
                  py: 2.5,
                  fontSize: '1.25rem',
                  bgcolor: 'text.primary',
                  color: 'background.default',
                  '&:hover': {
                    bgcolor: 'text.primary',
                    opacity: 0.9
                  }
                }}
              >
                CREATE FREE ACCOUNT
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                onClick={handleClick}
                sx={{
                  px: 5,
                  py: 2.5,
                  fontSize: '1.25rem',
                  bgcolor: 'background.default',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'background.default',
                    opacity: 0.9
                  }
                }}
              >
                SIGN IN
              </Button>
            </Box>

            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                color: 'text.primary',
                opacity: 0.75,
                pt: 2
              }}
            >
              No credit card required • Start in 2 minutes • Cancel anytime
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CTASection;
