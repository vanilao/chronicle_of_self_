import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4 py-12"
      sx={{ bgcolor: 'background.default' }}
    >
      <Box className="max-w-md w-full text-center space-y-8">
        {/* 404 Display */}
        <Box className="space-y-4">
          <Typography
            variant="h1"
            sx={{
              fontSize: '6rem',
              color: '#FF00FF',
              fontFamily: 'VT323, monospace'
            }}
          >
            404
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: '1.875rem',
              color: 'text.primary',
              fontFamily: 'VT323, monospace'
            }}
          >
            QUEST NOT FOUND
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          >
            The path you seek does not exist in this realm.
          </Typography>
        </Box>

        {/* Decorative Element */}
        <Box className="py-8">
          <Divider
            sx={{
              width: 128,
              height: 4,
              mx: 'auto',
              background: 'linear-gradient(to right, #00F5FF, #FF00FF, #FFFF00)',
              border: 'none'
            }}
          />
        </Box>

        {/* Navigation Options */}
        <Box className="space-y-4">
          <Button
            component={Link}
            to={isAuthenticated ? '/dashboard' : '/'}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Home />}
            sx={{
              py: 2,
              fontSize: '1rem'
            }}
          >
            {isAuthenticated ? 'RETURN TO DASHBOARD' : 'RETURN HOME'}
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="contained"
            fullWidth
            startIcon={<ArrowBack />}
            sx={{
              py: 2,
              fontSize: '1rem',
              bgcolor: 'background.paper',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'background.paper',
              }
            }}
          >
            GO BACK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
