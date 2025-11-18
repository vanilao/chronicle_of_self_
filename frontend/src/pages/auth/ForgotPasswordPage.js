import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  InputAdornment
} from '@mui/material';
import { Email, ArrowBack, FlashOn } from '@mui/icons-material';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email exists in localStorage (simulating backend validation)
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      try {
        const userData = JSON.parse(existingUser);
        if (userData.email === email) {
          // In a real app, this would send a password reset email
          // For demo purposes, we'll just show success message
          setSuccess(true);
          setIsLoading(false);
          return;
        }
      } catch {
        // Invalid stored data, continue
      }
    }

    // For demo purposes, we'll always show success to prevent email enumeration
    // In a real app, you might want to handle this differently
    setSuccess(true);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  if (success) {
    return (
      <Box
        className="min-h-screen flex items-center justify-center px-4 py-12"
        sx={{ bgcolor: 'background.default' }}
      >
        <Box className="max-w-md w-full space-y-8">
          {/* Header */}
          <Box className="text-center">
            <Typography
              variant="h1"
              sx={{
                fontSize: '3rem',
                color: 'text.primary',
                fontFamily: 'VT323, monospace',
                mb: 2
              }}
            >
              CHECK YOUR EMAIL
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontFamily: '"IBM Plex Mono", monospace',
                mb: 4
              }}
            >
              We've sent password reset instructions to your email
            </Typography>
          </Box>

          {/* Success Card */}
          <Card>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Password reset email sent successfully!
              </Alert>
              
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  mb: 4
                }}
              >
                Check your inbox at <strong>{email}</strong> and follow the instructions to reset your password.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 600
                  }}
                >
                  Back to Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 600
                  }}
                >
                  Try Another Email
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4 py-12"
      sx={{ bgcolor: 'background.default' }}
    >
      <Box className="max-w-md w-full space-y-8">
        {/* Header */}
        <Box className="text-center">
          <Typography
            variant="h1"
            sx={{
              fontSize: '3rem',
              color: 'text.primary',
              fontFamily: 'VT323, monospace',
              mb: 2
            }}
          >
            FORGOT PASSWORD
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          >
            Enter your email to reset your password
          </Typography>
        </Box>

        {/* Forgot Password Form */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <TextField
                id="email"
                name="email"
                type="email"
                label="EMAIL"
                required
                fullWidth
                value={email}
                onChange={handleChange}
                placeholder="hero@adventure.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: { fontWeight: 700, fontSize: '0.875rem' }
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<FlashOn />}
                disabled={isLoading}
                sx={{
                  py: 2,
                  fontSize: '1.125rem'
                }}
              >
                {isLoading ? 'SENDING...' : 'SEND RESET EMAIL'}
              </Button>
            </form>

            {/* Back to Login */}
            <Box className="text-center" sx={{ mt: 3 }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <ArrowBack sx={{ fontSize: 16 }} />
                  Back to login
                </Typography>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
