import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);

  const handleThemeToggle = () => {
    soundManager.playThemeToggle();
    toggleTheme();
  };

  const handleClick = () => {
    soundManager.playClick1();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '3px solid black',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ maxWidth: '80rem', mx: 'auto', width: '100%', px: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }} onClick={handleClick}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box component="img" src="/chronicle.png" alt="Chronicle emblem" sx={{ width: 36, height: 36 }} />
            <Typography
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: '1.5rem',
                color: 'text.primary',
                letterSpacing: '0.05em'
              }}
            >
              CHRONICLE OF SELF
            </Typography>
          </Box>
        </Link>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center'
          }}
        >
          {/* Nav Links - Desktop */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography
              component={Link}
              to="/"
              onClick={handleClick}
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Home
            </Typography>
            <Typography
              component={Link}
              to="/features"
              onClick={handleClick}
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Features
            </Typography>
            <Typography
              component={Link}
              to="/pricing"
              onClick={handleClick}
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Pricing
            </Typography>

          </Box>
        </Box>

        {/* Theme Toggle */}
                    <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleClick}
            >
              SIGN IN
            </Button>
        <IconButton
          onClick={handleThemeToggle}
          sx={{
            ml: 2,
            bgcolor: 'primary.main',
            border: '3px solid black',
            borderRadius: 2,
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              bgcolor: 'primary.main',
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
              transform: 'translate(2px, 2px)'
            }
          }}
        >
          {theme === 'light' ? (
            <DarkMode sx={{ color: 'text.primary' }} />
          ) : (
            <LightMode sx={{ color: 'text.primary' }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
