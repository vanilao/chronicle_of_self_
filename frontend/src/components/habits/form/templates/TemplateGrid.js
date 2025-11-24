import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import CompactTemplateCard from './CompactTemplateCard';

const TemplateGrid = ({ templates, onTemplateSelect }) => {
  if (templates.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.875rem',
            color: 'text.secondary'
          }}
        >
          No templates found matching your criteria
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
      {templates.map((template) => (
        <Box 
          key={template.id} 
          sx={{ 
            flex: '1 1 calc(33.333% - 12px)', 
            minWidth: '250px',
            maxWidth: 'calc(33.333% - 12px)'
          }}
        >
          <CompactTemplateCard 
            template={template} 
            onTemplateSelect={onTemplateSelect}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TemplateGrid;
