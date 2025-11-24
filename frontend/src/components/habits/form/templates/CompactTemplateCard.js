import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { Star } from '@mui/icons-material';

const CompactTemplateCard = ({ template, onTemplateSelect }) => {
  const IconComponent = template.icon;
  
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.15s ease-in-out',
        border: '2px solid #e0e0e0',
        boxShadow: '2px 2px 0px rgba(0,0,0,1)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '3px 3px 0px rgba(0,0,0,1)',
          borderColor: template.color
        },
        height: 'auto', // Default height for cards
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={() => onTemplateSelect(template)}
    >
      <CardContent sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header with icon and name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <IconComponent sx={{ fontSize: 20, color: template.color, flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: 'text.primary',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {template.name}
            </Typography>
            <Box
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                color: 'text.secondary',
                lineHeight: 1.1,
                height: '2.2em', // Exactly 2 lines (1.1 * 2)
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {template.description}
            </Box>
          </Box>
          {template.popular && (
            <Star sx={{ fontSize: 16, color: '#ff9800', flexShrink: 0 }} />
          )}
        </Box>

        {/* Tags row */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center', mt: 'auto' }}>
          <Chip
            label={template.difficulty}
            size="small"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.5rem',
              height: 18,
              bgcolor: 'transparent',
              color: template.difficulty === 'Easy' ? '#4caf50' : 
                     template.difficulty === 'Medium' ? '#ff9800' : '#f44336',
              border: `1px solid ${template.difficulty === 'Easy' ? '#4caf50' : 
                                  template.difficulty === 'Medium' ? '#ff9800' : '#f44336'}`,
              fontWeight: 600
            }}
          />
          <Chip
            label={template.frequency}
            size="small"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.5rem',
              height: 18,
              bgcolor: 'transparent',
              color: '#2196f3',
              border: '1px solid #2196f3',
              fontWeight: 600
            }}
          />
          {template.targetCompletions > 1 && (
            <Chip
              label={`${template.targetCompletions}x`}
              size="small"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.5rem',
                height: 18,
                bgcolor: 'transparent',
                color: '#9c27b0',
                border: '1px solid #9c27b0',
                fontWeight: 600
              }}
            />
          )}
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.5rem',
              color: 'text.secondary',
              ml: 'auto',
              fontWeight: 600
            }}
          >
            {template.category}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompactTemplateCard;
