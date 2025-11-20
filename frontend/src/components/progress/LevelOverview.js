import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  LinearProgress
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { getXPProgressPercentage, getLevelTier } from '../../utils/levelingSystem';

const LevelOverview = () => {
  const { user } = useAuth();

  if (!user) return null;

  const xpProgress = getXPProgressPercentage(user.currentXP, user.nextLevelXP);
  const levelTier = getLevelTier(user.level);

  return (
    <Card sx={{ background: 'linear-gradient(to bottom right, #FFB3D9, #B4F8C8)', mb: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2, border: '3px solid black', boxShadow: '4px 4px 0px rgba(0,0,0,1)' }}>
                <EmojiEvents sx={{ fontSize: 64, color: 'primary.main' }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1 }}>
                  <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '3.75rem', color: 'text.primary' }}>
                    {user.level}
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.primary', opacity: 0.6 }}>
                    {levelTier}
                  </Typography>
                </Box>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '1.125rem', color: 'text.primary', mb: 0.5 }}>
                  {user.title}
                </Typography>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                  {user.archetype} • {user.archetypeCategory}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', fontWeight: 700, color: 'text.primary' }}>
                  XP PROGRESS
                </Typography>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                  {user.currentXP} / {user.nextLevelXP}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={xpProgress}
                sx={{ height: 32, borderRadius: 2, border: '3px solid black', bgcolor: 'background.default', mb: 1, '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' } }}
              />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                {Math.round(xpProgress)}% to next level
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LevelOverview;
