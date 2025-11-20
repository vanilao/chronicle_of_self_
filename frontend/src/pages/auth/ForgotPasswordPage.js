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
import { sendPasswordResetEmail, generateVerificationCode, storePasswordResetCode } from '../../utils/emailService';

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

    try {
      // Check if email exists in localStorage (simulating backend validation)
      const existingUser = localStorage.getItem('user');
      let userData = null;
      
      if (existingUser) {
        try {
          userData = JSON.parse(existingUser);
          // Also check for username match
          const identifier = email.trim().toLowerCase();
          const emailMatch = userData.email && userData.email.toLowerCase() === identifier;
          const usernameMatch = userData.username && userData.username.toLowerCase() === identifier;
          
          if (!emailMatch && !usernameMatch) {
            userData = null;
          }
        } catch {
          // Invalid stored data, continue
        }
      }

      if (!userData) {
        // For security, don't reveal if email exists or not
        // Just show success message to prevent email enumeration
        setSuccess(true);
        setIsLoading(false);
        return;
      }

      // Generate reset code and store it
      const resetCode = generateVerificationCode();
      storePasswordResetCode(userData.email, resetCode);

      // Send password reset email
      const emailResult = await sendPasswordResetEmail(
        userData.email,
        userData.username,
        resetCode
      );

      if (!emailResult.success) {
        setError('Failed to send reset email. Please try again.');
        setIsLoading(false);
        return;
      }

      // Store email for reset page
      localStorage.setItem('resetEmail', userData.email);
      
      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
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
                fontSize: '0.875rem',
                mb: 4
              }}
            >
              We've sent a 6-digit reset code to your email
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
                  onClick={() => navigate('/reset-password')}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 600
                  }}
                >
                  Enter Reset Code
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
