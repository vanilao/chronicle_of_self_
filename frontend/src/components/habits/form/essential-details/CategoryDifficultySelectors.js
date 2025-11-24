import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Target, TrendingUp } from 'lucide-react';

const CategoryDifficultySelectors = ({ 
  formData, 
  handleChange, 
  userArchetypeCategory, 
  getDifficultyXP 
}) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
      {/* Category Selector */}
      <Box>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'text.primary',
            mb: 0.75,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Target size={14} />
          Category *
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}>
            Select Category
          </InputLabel>
          <Select
            value={formData.category || ''}
            onChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
            label="Select Category"
            MenuProps={{
              sx: {
                zIndex: 14000
              }
            }}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.875rem'
            }}
          >
            <MenuItem value="Body">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Body</span>
                {userArchetypeCategory === 'Body' && (
                  <Typography sx={{ 
                    fontFamily: '"IBM Plex Mono", monospace', 
                    fontSize: '0.625rem', 
                    color: 'success.main', 
                    fontWeight: 700 
                  }}>
                    +25% XP
                  </Typography>
                )}
              </Box>
            </MenuItem>
            <MenuItem value="Mind">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Mind</span>
                {userArchetypeCategory === 'Mind' && (
                  <Typography sx={{ 
                    fontFamily: '"IBM Plex Mono", monospace', 
                    fontSize: '0.625rem', 
                    color: 'success.main', 
                    fontWeight: 700 
                  }}>
                    +25% XP
                  </Typography>
                )}
              </Box>
            </MenuItem>
            <MenuItem value="Spirit">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Spirit</span>
                {userArchetypeCategory === 'Spirit' && (
                  <Typography sx={{ 
                    fontFamily: '"IBM Plex Mono", monospace', 
                    fontSize: '0.625rem', 
                    color: 'success.main', 
                    fontWeight: 700 
                  }}>
                    +25% XP
                  </Typography>
                )}
              </Box>
            </MenuItem>
            <MenuItem value="Creative">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Creative</span>
                {userArchetypeCategory === 'Creative' && (
                  <Typography sx={{ 
                    fontFamily: '"IBM Plex Mono", monospace', 
                    fontSize: '0.625rem', 
                    color: 'success.main', 
                    fontWeight: 700 
                  }}>
                    +25% XP
                  </Typography>
                )}
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Difficulty Selector */}
      <Box>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'text.primary',
            mb: 0.75,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <TrendingUp size={14} />
          Difficulty
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}>
            Select Difficulty
          </InputLabel>
          <Select
            value={formData.difficulty || ''}
            onChange={(e) => handleChange({ target: { name: 'difficulty', value: e.target.value } })}
            label="Select Difficulty"
            MenuProps={{
              sx: {
                zIndex: 14000
              }
            }}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.875rem'
            }}
          >
            <MenuItem value="Easy">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Easy</span>
                <Typography sx={{ 
                  fontFamily: '"IBM Plex Mono", monospace', 
                  fontSize: '0.625rem', 
                  color: getDifficultyXP('Easy').bonus ? 'success.main' : 'text.secondary', 
                  fontWeight: 700 
                }}>
                  +{getDifficultyXP('Easy').total} XP
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem value="Medium">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Medium</span>
                <Typography sx={{ 
                  fontFamily: '"IBM Plex Mono", monospace', 
                  fontSize: '0.625rem', 
                  color: getDifficultyXP('Medium').bonus ? 'success.main' : 'text.secondary', 
                  fontWeight: 700 
                }}>
                  +{getDifficultyXP('Medium').total} XP
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem value="Hard">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Hard</span>
                <Typography sx={{ 
                  fontFamily: '"IBM Plex Mono", monospace', 
                  fontSize: '0.625rem', 
                  color: getDifficultyXP('Hard').bonus ? 'success.main' : 'text.secondary', 
                  fontWeight: 700 
                }}>
                  +{getDifficultyXP('Hard').total} XP
                </Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CategoryDifficultySelectors;
