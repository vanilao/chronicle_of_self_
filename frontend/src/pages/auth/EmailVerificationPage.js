import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { ArrowBack, FlashOn, Refresh } from '@mui/icons-material';
import { verifyStoredCode, sendVerificationEmail, generateVerificationCode, storeVerificationCode } from '../../utils/emailService';
import { useAuth } from '../../contexts/AuthContext';
import { useSoundContext } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import SoundManager from '../../utils/soundManager';

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { playSound } = useSoundContext();
  const { theme } = useTheme();
  const soundManager = new SoundManager(playSound);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('verificationEmail') || '';
  const pendingUser = location.state?.pendingUser || JSON.parse(localStorage.getItem('pendingUser') || '{}');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Verify the stored code
    const verification = verifyStoredCode(email, verificationCode);
    
    if (!verification.valid) {
      setError(verification.error);
      setIsLoading(false);
      return;
    }

    // Clear verification data
    localStorage.removeItem('verificationData');
    
    // Complete user registration
    const verifiedUser = {
      ...pendingUser,
      emailVerified: true
    };
    
    // Use AuthContext to register the user (this updates the context state)
    console.log('Registering user with data:', verifiedUser);
    register(verifiedUser);
    console.log('User registered successfully');
    
    // Clear pending user data
    localStorage.removeItem('pendingUser');
    
    // Redirect to archetype selection
    navigate('/select-archetype');
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;
    
    setIsResending(true);
    setError('');

    // Generate new verification code
    const newVerificationCode = generateVerificationCode();
    
    // Send verification email
    const emailResult = await sendVerificationEmail(
      email,
      pendingUser?.username || 'User',
      newVerificationCode
    );

    if (!emailResult.success) {
      setError('Failed to resend verification email. Please try again.');
      setIsResending(false);
      return;
    }

    // Store new verification code
    storeVerificationCode(email, newVerificationCode);
    
    // Reset timer
    setTimeLeft(60);
    setIsResending(false);
  };

  // Countdown timer
  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and max 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setVerificationCode(value);
    }
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
            VERIFY EMAIL
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace',
              mb: 1
            }}
          >
            We've sent a verification code to your email
          </Typography>
          <Typography
            sx={{
              color: 'text.primary',
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 600
            }}
          >
            {email}
          </Typography>
        </Box>

        {/* Verification Form */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Verification Code Field */}
              <TextField
                id="verificationCode"
                name="verificationCode"
                type="text"
                label="VERIFICATION CODE"
                required
                fullWidth
                value={verificationCode}
                onChange={handleChange}
                placeholder="Enter 6-digit code"
                inputProps={{
                  maxLength: 6,
                  style: { 
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontFamily: '"IBM Plex Mono", monospace',
                    letterSpacing: '0.5em'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ width: 24 }} />
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
                disabled={isLoading || verificationCode.length !== 6}
                sx={{
                  py: 2,
                  fontSize: '1.125rem'
                }}
              >
                {isLoading ? 'VERIFYING...' : 'VERIFY EMAIL'}
              </Button>
            </form>

            {/* Resend Code */}
            <Box className="text-center" sx={{ mt: 3 }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  mb: 2
                }}
              >
                Didn't receive the code?
              </Typography>
              <Button
                variant="text"
                onClick={handleResendCode}
                disabled={timeLeft > 0 || isResending}
                startIcon={<Refresh />}
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 600,
                  color: 'secondary.main',
                  '&:hover': { bgcolor: 'secondary.light' },
                  '&:disabled': { color: 'text.secondary' }
                }}
              >
                {isResending ? 'SENDING...' : 
                 timeLeft > 0 ? `RESEND (${timeLeft}s)` : 'RESEND CODE'}
              </Button>
            </Box>

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

export default EmailVerificationPage;
