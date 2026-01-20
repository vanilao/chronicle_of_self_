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
  Alert,
  IconButton
} from '@mui/material';
import { Email, Lock, Person, FlashOn, Visibility, VisibilityOff } from '@mui/icons-material';
import { getXPForNextLevel, getTitleForLevel } from '../../utils/levelingSystem';
import { calculatePasswordStrength } from '../../utils/passwordStrength';
import { sendVerificationEmail, generateVerificationCode, storeVerificationCode } from '../../utils/emailService';
import { useSoundContext } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import SoundManager from '../../utils/soundManager';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { playSound } = useSoundContext();
  const { theme } = useTheme();
  const soundManager = new SoundManager(playSound);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleClick = () => {
    soundManager.playClick1();
  };

  const handleBackToHome = () => {
    soundManager.playCancel();
  };

  const handleSignInClick = () => {
    soundManager.playClick1();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSendingEmail(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsSendingEmail(false);
      return;
    }

    // Check if email already exists (simulating backend validation)
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      try {
        const userData = JSON.parse(existingUser);
        if (userData.email === formData.email) {
          setError('An account with this email already exists. Please login instead.');
          setIsSendingEmail(false);
          return;
        }
      } catch {
        // Invalid stored data, continue
      }
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    
    // Send verification email
    const emailResult = await sendVerificationEmail(
      formData.email,
      formData.username,
      verificationCode
    );

    if (!emailResult.success) {
      setError('Failed to send verification email. Please try again.');
      setIsSendingEmail(false);
      return;
    }

    // Create new user with level 1 (not 0)
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password, // Store password for demo (not secure in real app)
      level: 1,
      title: getTitleForLevel(1),
      currentXP: 0,
      nextLevelXP: getXPForNextLevel(1),
      archetype: null, // Will be set in archetype selection
      archetypeCategory: null,
      emailVerified: false // Add email verification flag
    };

    // Store verification data and pending user
    storeVerificationCode(formData.email, verificationCode);
    localStorage.setItem('pendingUser', JSON.stringify(newUser));
    
    // Redirect to verification page
    navigate('/verify-email', { state: { email: formData.email, pendingUser: newUser } });
    setIsSendingEmail(false);
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
            START YOUR QUEST
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace'
            }}
          >
            Create your account and begin your journey
          </Typography>
        </Box>

        {/* Register Form */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <TextField
                id="username"
                name="username"
                type="text"
                label="USERNAME"
                required
                fullWidth
                value={formData.username}
                onChange={handleChange}
                placeholder="heroname"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: { fontWeight: 700, fontSize: '0.875rem' }
                }}
              />

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
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        color: calculatePasswordStrength(formData.password).color
                      }}
                    >
                      Password strength: {calculatePasswordStrength(formData.password).label}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[1, 2, 3, 4, 5, 6].map((level) => (
                      <Box
                        key={level}
                        sx={{
                          flex: 1,
                          height: 4,
                          borderRadius: 1,
                          bgcolor: level <= calculatePasswordStrength(formData.password).score
                            ? calculatePasswordStrength(formData.password).color
                            : 'grey.300'
                        }}
                      />
                    ))}
                  </Box>
                  {passwordFocused && (
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.75rem',
                          color: 'text.secondary'
                        }}
                      >
                        Password must include:
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: calculatePasswordStrength(formData.password).checks.length
                              ? 'success.main'
                              : 'text.secondary'
                          }}
                        >
                          {calculatePasswordStrength(formData.password).checks.length ? '✓' : '○'} At least 8 characters
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: calculatePasswordStrength(formData.password).checks.lowercase
                              ? 'success.main'
                              : 'text.secondary'
                          }}
                        >
                          {calculatePasswordStrength(formData.password).checks.lowercase ? '✓' : '○'} Lowercase letter
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: calculatePasswordStrength(formData.password).checks.uppercase
                              ? 'success.main'
                              : 'text.secondary'
                          }}
                        >
                          {calculatePasswordStrength(formData.password).checks.uppercase ? '✓' : '○'} Uppercase letter
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: calculatePasswordStrength(formData.password).checks.numbers
                              ? 'success.main'
                              : 'text.secondary'
                          }}
                        >
                          {calculatePasswordStrength(formData.password).checks.numbers ? '✓' : '○'} Number
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: calculatePasswordStrength(formData.password).checks.special
                              ? 'success.main'
                              : 'text.secondary'
                          }}
                        >
                          {calculatePasswordStrength(formData.password).checks.special ? '✓' : '○'} Special character
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              {/* Confirm Password Field */}
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="CONFIRM PASSWORD"
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
                disabled={isSendingEmail}
                onClick={handleClick}
                sx={{
                  py: 2,
                  fontSize: '1.125rem'
                }}
              >
                {isSendingEmail ? 'SENDING VERIFICATION EMAIL...' : 'CREATE ACCOUNT'}
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

            {/* Sign In Link */}
            <Box className="text-center">
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem'
                }}
              >
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{ textDecoration: 'none' }}
                  onClick={handleSignInClick}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 700,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <Box className="text-center">
          <Link to="/" style={{ textDecoration: 'none' }} onClick={handleBackToHome}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                color: 'text.secondary',
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

export default RegisterPage;
