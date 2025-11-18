import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Box
        className="min-h-screen flex items-center justify-center"
        sx={{ bgcolor: 'background.default' }}
      >
        <Box className="text-center">
          <CircularProgress
            size={48}
            sx={{
              color: 'neon.cyan',
              mb: 2
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'VT323, monospace',
              color: 'text.primary'
            }}
          >
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
