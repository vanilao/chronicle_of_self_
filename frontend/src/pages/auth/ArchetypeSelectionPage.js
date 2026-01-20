import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid
} from '@mui/material';
import {
  FitnessCenter,
  MenuBook,
  SelfImprovement,
  Palette,
  ChevronRight
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useSoundContext } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import SoundManager from '../../utils/soundManager';

const ArchetypeSelectionPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { playSound } = useSoundContext();
  const { theme } = useTheme();
  const soundManager = new SoundManager(playSound);
  const [selectedArchetype, setSelectedArchetype] = useState(null);

  const archetypes = [
    {
      id: 'warrior',
      name: 'WARRIOR',
      icon: FitnessCenter,
      subtitle: 'Master physical discipline',
      description: 'Perfect for fitness enthusiasts and athletes. Gain +25% XP for Body category habits like exercise, sports, and physical challenges.',
      bonus: 'BODY +25% XP',
      color: 'secondary',
      category: 'Body'
    },
    {
      id: 'sage',
      name: 'SAGE',
      icon: MenuBook,
      subtitle: 'Cultivate wisdom',
      description: 'Ideal for learners and thinkers. Gain +25% XP for Mind category habits like reading, learning, and problem-solving.',
      bonus: 'MIND +25% XP',
      color: 'primary',
      category: 'Mind'
    },
    {
      id: 'monk',
      name: 'MONK',
      icon: SelfImprovement,
      subtitle: 'Find inner peace',
      description: 'Great for mindfulness seekers. Gain +25% XP for Spirit category habits like meditation, reflection, and mindfulness.',
      bonus: 'SPIRIT +25% XP',
      color: 'success',
      category: 'Spirit'
    },
    {
      id: 'artisan',
      name: 'ARTISAN',
      icon: Palette,
      subtitle: 'Express creativity',
      description: 'Built for creators and makers. Gain +25% XP for Creative category habits like art, music, writing, and crafting.',
      bonus: 'CREATIVE +25% XP',
      color: 'info',
      category: 'Creative'
    }
  ];

  const handleSelect = (archetypeId) => {
    setSelectedArchetype(archetypeId);
  };

  const handleContinue = () => {
    if (!selectedArchetype) {
      return;
    }

    // Update user with selected archetype
    const selectedArchetypeData = archetypes.find(a => a.id === selectedArchetype);
    updateUser({
      archetype: selectedArchetypeData.name,
      archetypeCategory: selectedArchetypeData.category
    });

    // Navigate to dashboard - ThemeSoundManager will handle starting the music
    console.log(`🎵 Registration complete - navigating to dashboard`);
    navigate('/dashboard');
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4 py-12"
      sx={{ bgcolor: 'background.default' }}
    >
      <Box className="max-w-5xl w-full space-y-8">
        {/* Header */}
        <Box className="text-center space-y-4">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '3.75rem' },
              color: 'text.primary',
              fontFamily: 'VT323, monospace'
            }}
          >
            CHOOSE YOUR PATH
          </Typography>
          <Typography
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace',
              maxWidth: '42rem',
              mx: 'auto'
            }}
          >
            Select an archetype that matches your goals. You'll earn bonus XP for completing habits in your chosen category. Don't worry, you can change this later!
          </Typography>
        </Box>

        {/* Archetype Grid */}
        <Grid container spacing={3}>
          {archetypes.map((archetype) => {
            const Icon = archetype.icon;
            const isSelected = selectedArchetype === archetype.id;

            return (
              <Grid size={{ xs: 12, md: 6 }} key={archetype.id}>
                <Card
                  onClick={() => handleSelect(archetype.id)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    opacity: isSelected ? 1 : 0.9,
                    outline: isSelected ? '4px solid' : 'none',
                    outlineColor: 'text.primary',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      opacity: 1
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box className="flex items-start justify-between mb-4">
                      <Box>
                        <Box
                          sx={{
                            bgcolor: 'background.default',
                            p: 1.5,
                            borderRadius: 2,
                            border: '3px solid black',
                            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                            width: 'fit-content',
                            mb: 2
                          }}
                        >
                          <Icon sx={{ fontSize: 40, color: 'text.primary' }} />
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: '1.875rem',
                            color: 'text.primary',
                            fontFamily: 'VT323, monospace',
                            mb: 1
                          }}
                        >
                          {archetype.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            color: 'text.primary',
                            fontFamily: '"IBM Plex Mono", monospace',
                            opacity: 0.9
                          }}
                        >
                          {archetype.subtitle}
                        </Typography>
                      </Box>
                      <Box className="flex flex-col items-end gap-2">
                        <Chip
                          label={archetype.bonus}
                          size="small"
                          sx={{
                            bgcolor: 'background.default',
                            border: '2px solid black',
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem'
                          }}
                        />
                        {isSelected && (
                          <Chip
                            label="SELECTED"
                            size="small"
                            sx={{
                              bgcolor: 'text.primary',
                              color: 'background.default',
                              border: '2px solid black',
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: '0.75rem'
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        color: 'text.primary',
                        fontFamily: '"IBM Plex Mono", monospace',
                        lineHeight: 1.6
                      }}
                    >
                      {archetype.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Continue Button */}
        <Box className="flex justify-center pt-4">
          <Button
            onClick={handleContinue}
            disabled={!selectedArchetype}
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ChevronRight />}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.25rem'
            }}
          >
            CONTINUE
          </Button>
        </Box>

        {/* Skip Option */}
        <Box className="text-center">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="text"
            sx={{
              color: 'text.secondary',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'secondary.main',
                bgcolor: 'transparent'
              }
            }}
          >
            Skip for now →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ArchetypeSelectionPage;
