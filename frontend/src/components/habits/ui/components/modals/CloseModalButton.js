import React from 'react';
import { IconButton } from '@mui/material';
import { X } from 'lucide-react';

const CloseModalButton = ({ onClick, size = 'small', variant = 'default' }) => {
  const styles = {
    default: {
      bgcolor: 'background.default',
      border: '2px solid black',
      borderRadius: 1.5,
      boxShadow: '2px 2px 0px rgba(0,0,0,1)',
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: '#ef4444',
        boxShadow: '1px 1px 0px rgba(0,0,0,1)',
        transform: 'translate(1px, 1px)',
        '& svg': {
          color: 'white'
        }
      }
    },
    minimal: {
      border: '2px solid black',
      borderRadius: 1.5,
      p: 0.5,
      '&:hover': {
        backgroundColor: '#000',
        color: '#fff'
      }
    }
  };

  return (
    <IconButton 
      onClick={onClick} 
      size={size}
      sx={styles[variant]}
    >
      <X />
    </IconButton>
  );
};

export default React.memo(CloseModalButton);
