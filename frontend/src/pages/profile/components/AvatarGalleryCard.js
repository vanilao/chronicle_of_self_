import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Tooltip
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const MOCK_AVATARS = [
  { id: 1, name: 'Knight', unlockLevel: 5, color: '#6366f1' },
  { id: 2, name: 'Mage', unlockLevel: 10, color: '#8b5cf6' },
  { id: 3, name: 'Rogue', unlockLevel: 15, color: '#ec4899' },
  { id: 4, name: 'Healer', unlockLevel: 20, color: '#10b981' },
  { id: 5, name: 'Dragon', unlockLevel: 25, color: '#f59e0b' },
  { id: 6, name: 'Phoenix', unlockLevel: 30, color: '#ef4444' },
];

const AvatarGalleryCard = ({ level }) => {
  return (
    <Card>
      <CardContent sx={{ p: 4 }} className="space-y-4">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '1.25rem',
              color: 'text.primary'
            }}
          >
            AVATAR GALLERY
          </Typography>
          <Chip
            label="COMING SOON"
            size="small"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.625rem',
              bgcolor: 'primary.main',
              color: 'white',
              border: '2px solid black'
            }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: 'text.secondary',
            mb: 2
          }}
        >
          Unlock special avatars as you level up. Each avatar represents your journey!
        </Typography>

        <Grid container spacing={2}>
          {MOCK_AVATARS.map((avatar) => {
            const isUnlocked = level >= avatar.unlockLevel;
            return (
              <Grid size={{ xs: 4, sm: 2 }} key={avatar.id}>
                <Tooltip
                  title={isUnlocked ? avatar.name : `Unlocks at Level ${avatar.unlockLevel}`}
                  arrow
                >
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: '1',
                      bgcolor: isUnlocked ? avatar.color : 'background.default',
                      borderRadius: 2,
                      border: '3px solid black',
                      boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isUnlocked ? 1 : 0.5,
                      cursor: 'not-allowed',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: isUnlocked ? 'scale(1.05)' : 'none'
                      }
                    }}
                  >
                    {isUnlocked ? (
                      <Typography
                        sx={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '1.5rem',
                          color: 'white'
                        }}
                      >
                        {avatar.name.charAt(0)}
                      </Typography>
                    ) : (
                      <LockOutlined sx={{ fontSize: 24, color: 'text.secondary' }} />
                    )}
                    {!isUnlocked && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -8,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          bgcolor: 'background.paper',
                          px: 0.5,
                          borderRadius: 1,
                          border: '1px solid black'
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.5rem',
                            color: 'text.secondary',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          LV{avatar.unlockLevel}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'background.default',
            borderRadius: 2,
            border: '2px dashed',
            borderColor: 'text.secondary',
            textAlign: 'center'
          }}
        >
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
              color: 'text.secondary'
            }}
          >
            More avatars and customization options will be added in future updates!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AvatarGalleryCard;
