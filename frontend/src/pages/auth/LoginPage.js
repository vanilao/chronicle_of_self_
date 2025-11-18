import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  IconButton,
  Alert
} from '@mui/material';
import { Email, Lock, FlashOn, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check for existing user in localStorage (simulating backend)
    const existingUser = localStorage.getItem('user');

    if (existingUser) {
      try {
        const userData = JSON.parse(existingUser);
        // Check if email matches (simple validation)
        if (userData.email === formData.email) {
          // Check if password matches (in real app, this would be hashed)
          if (userData.password === formData.password || !userData.password) {
            login(userData);
            navigate('/dashboard');
            return;
          } else {
            setError('Invalid password');
            return;
          }
        }
      } catch {
        // Invalid stored data, continue to create new user
      }
    }

    setError('Invalid email or password');
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
            WELCOME BACK
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          >
            Continue your adventure
          </Typography>
        </Box>

        {/* Login Form */}
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
                value={formData.email}
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

              {/* Password Field */}
              <TextField
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="PASSWORD"
                required
                fullWidth
                value={formData.password}
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

              {/* Remember Me Checkbox */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': { color: 'primary.main' }
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.875rem',
                        color: 'text.primary'
                      }}
                    >
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  to="/forgot-password"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      color: 'secondary.main',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<FlashOn />}
                sx={{
                  py: 2,
                  fontSize: '1.125rem'
                }}
              >
                SIGN IN
              </Button>
            </form>

            {/* Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem'
                }}
              >
                OR
              </Typography>
            </Divider>

            {/* Sign Up Link */}
            <Box className="text-center">
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem'
                }}
              >
                New adventurer?{' '}
                <Link
                  to="/register"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 700,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Create an account
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <Box className="text-center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: 'text.secondary',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' }
              }}
            >
              ← Back to home
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
