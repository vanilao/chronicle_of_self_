import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  LinearProgress,
  Avatar
} from '@mui/material';
import {
  Person,
  Settings,
  DarkMode,
  LightMode,
  Logout,
  KeyboardArrowDown
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';
import { getXPProgressPercentage } from '../../utils/levelingSystem';

const UserNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { currentDate, offsetDays, advanceDay, rewindDay, resetDay, isTimeTraveling } = useTimeTravel();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!user) return null;

  const xpProgress = getXPProgressPercentage(user.currentXP ?? 0, user.nextLevelXP ?? 100);
  const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const offsetLabel = offsetDays === 0 ? 'Today' : `${offsetDays > 0 ? '+' : ''}${offsetDays}d`;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    window.location.href = '/';
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
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
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
              to="/dashboard"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Dashboard
            </Typography>
            <Typography
              component={Link}
              to="/habits"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Habits
            </Typography>
            <Typography
              component={Link}
              to="/progress"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Progress
            </Typography>
          </Box>
        </Box>

        {/* User Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 4 }}>
          
          {/* User Dropdown */}
          <Button
            onClick={handleMenuOpen}
            sx={{
              bgcolor: 'background.default',
              border: '3px solid black',
              borderRadius: 2,
              boxShadow: '4px 4px 0px rgba(0,0,0,1)',
              px: 2,
              py: 1,
              '&:hover': {
                bgcolor: 'background.default',
                transform: 'scale(1.02)'
              }
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                border: '2px solid black',
                mr: 1.5
              }}
            >
              <Person sx={{ fontSize: 20, color: 'text.primary' }} />
            </Avatar>

            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left', minWidth: 120 }}>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'text.primary'
                }}
              >
                {user.username}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Lvl {user.level ?? 0}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={xpProgress}
                  sx={{
                    flex: 1,
                    height: 6,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'primary.main'
                    }
                  }}
                />
              </Box>
            </Box>

            <KeyboardArrowDown
              sx={{
                ml: 1,
                color: 'text.primary',
                transform: anchorEl ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s'
              }}
            />
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                width: 256,
                border: '3px solid black',
                borderRadius: 2,
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                mt: 1
              }
            }}
          >
            {/* User Stats Header */}
            <Box sx={{ px: 2, py: 1.5, borderBottom: '2px solid black' }}>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  mb: 0.5
                }}
              >
                {user.title || 'Adventurer'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.primary'
                  }}
                >
                  Level {user.level ?? 0}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary'
                  }}
                >
                  {user.currentXP ?? 0} / {user.nextLevelXP ?? 100} XP
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={xpProgress}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  border: '2px solid black',
                  bgcolor: 'background.default',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'primary.main'
                  }
                }}
              />
            </Box>

            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleMenuClose}
              sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', py: 1.5 }}
            >
              <Person sx={{ mr: 1.5, fontSize: 16 }} />
              Profile
            </MenuItem>

            <MenuItem
              component={Link}
              to="/settings"
              onClick={handleMenuClose}
              sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', py: 1.5 }}
            >
              <Settings sx={{ mr: 1.5, fontSize: 16 }} />
              Settings
            </MenuItem>

            <MenuItem
              onClick={() => {
                toggleTheme();
                handleMenuClose();
              }}
              sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', py: 1.5 }}
            >
              {theme === 'light' ? (
                <>
                  <DarkMode sx={{ mr: 1.5, fontSize: 16 }} />
                  Dark Mode
                </>
              ) : (
                <>
                  <LightMode sx={{ mr: 1.5, fontSize: 16 }} />
                  Light Mode
                </>
              )}
            </MenuItem>

            <Divider sx={{ borderColor: 'black', borderWidth: 1 }} />

            <MenuItem
              onClick={handleLogout}
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                py: 1.5,
                color: 'error.main'
              }}
            >
              <Logout sx={{ mr: 1.5, fontSize: 16 }} />
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;
