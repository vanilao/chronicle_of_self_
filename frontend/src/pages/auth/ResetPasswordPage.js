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
  InputAdornment,
  IconButton
} from '@mui/material';
import { Lock, ArrowBack, FlashOn, Visibility, VisibilityOff } from '@mui/icons-material';
import { verifyPasswordResetCode, clearPasswordResetData } from '../../utils/emailService';
import { useAuth } from '../../contexts/AuthContext';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get email from localStorage
  const email = localStorage.getItem('resetEmail') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long!');
      setIsLoading(false);
      return;
    }

    try {
      // Verify reset code
      const verification = verifyPasswordResetCode(email, formData.resetCode);
      
      if (!verification.valid) {
        setError(verification.error);
        setIsLoading(false);
        return;
      }

      // Get current user data and update password
      const existingUser = localStorage.getItem('user');
      if (existingUser) {
        const userData = JSON.parse(existingUser);
        
        // Update user password
        const updatedUser = {
          ...userData,
          password: formData.newPassword
        };

        // Save updated user data
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update auth context if user is logged in
        if (userData.email === email) {
          updateUser({ password: formData.newPassword });
        }

        // Clear reset data
        clearPasswordResetData();
        localStorage.removeItem('resetEmail');

        // Redirect to login with success message
        navigate('/login', { 
          state: { 
            message: 'Password reset successfully! You can now log in with your new password.' 
          } 
        });
      } else {
        setError('User account not found. Please try again.');
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred while resetting your password. Please try again.');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            RESET PASSWORD
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          >
            Enter the reset code and your new password
          </Typography>
        </Box>

        {/* Reset Password Form */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reset Code Field */}
              <TextField
                id="resetCode"
                name="resetCode"
                type="text"
                label="RESET CODE"
                required
                fullWidth
                value={formData.resetCode}
                onChange={handleChange}
                placeholder="123456"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlashOn sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: { fontWeight: 700, fontSize: '0.875rem' }
                }}
              />

              {/* New Password Field */}
              <TextField
                id="newPassword"
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                label="NEW PASSWORD"
                required
                fullWidth
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: { fontWeight: 700, fontSize: '0.875rem' }
                }}
              />

              {/* Confirm Password Field */}
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="CONFIRM NEW PASSWORD"
                required
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
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
                {isLoading ? 'RESETTING...' : 'RESET PASSWORD'}
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

export default ResetPasswordPage;
