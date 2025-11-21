import React from 'react';
import { MenuItem, Box } from '@mui/material';
import { getCategoryConfig } from '../../../config/categories';
import CategoryIndicator from './CategoryIndicator';
import CategoryText from './CategoryText';
import CategoryCount from './CategoryCount';

const CategoryMenuItem = ({ category, isSelected, onSelect }) => {
  const config = getCategoryConfig(category.name);
  
  const menuItemSx = {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      bgcolor: config.hoverBg,
      '& .MuiTypography-root': {
        color: config.color,
        fontWeight: 700
      }
    },
    '&.Mui-selected': {
      bgcolor: config.bgColor,
      '&:hover': {
        bgcolor: config.hoverBg,
      }
    }
  };
  
  return (
    <MenuItem 
      value={category.name}
      onClick={() => onSelect(category.name)}
      sx={menuItemSx}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <CategoryIndicator category={category.name} />
        <CategoryText category={category.name} isSelected={isSelected} />
        <CategoryCount count={category.count} category={category.name} />
      </Box>
    </MenuItem>
  );
};

export default CategoryMenuItem;
