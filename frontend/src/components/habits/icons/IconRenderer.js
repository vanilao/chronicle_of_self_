import React from 'react';
import {
  Favorite,
  Star,
  Home,
  Person,
  Settings,
  Notifications,
  CalendarToday,
  Mail,
  FitnessCenter,
  LocalCafe,
  Book,
  Work,
  MusicNote,
  Restaurant,
  DirectionsRun,
  SelfImprovement,
  School,
  Code,
  Palette,
  Camera,
  Headphones,
  SportsBasketball,
  Pets,
  LocalFlorist,
  ShoppingBag,
  DirectionsBike,
  Pool,
  WbSunny,
  Cloud,
  EmojiEvents,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  MedicalServices,
  Psychology,
  Nature,
  Park,
  MenuBook,
  Computer,
  PhoneAndroid,
  Brush,
  PhotoCamera,
  Mic,
  Speaker,
  LocalPizza,
  Cake
} from '@mui/icons-material';

// Map icon names to their MUI icon components
const iconMap = {
  // Popular icons
  Favorite,
  Star,
  Home,
  Person,
  Settings,
  Notifications,
  CalendarToday,
  Mail,
  
  // Activity icons
  FitnessCenter,
  DirectionsRun,
  SelfImprovement,
  SportsBasketball,
  DirectionsBike,
  Pool,
  
  // Learning icons
  Book,
  School,
  Code,
  Lightbulb,
  Palette,
  Camera,
  MenuBook,
  Computer,
  PhoneAndroid,
  
  // Work icons
  Work,
  TrendingUp,
  CheckCircle,
  EmojiEvents,
  Brush,
  PhotoCamera,
  
  // Lifestyle icons
  LocalCafe,
  Restaurant,
  MusicNote,
  Headphones,
  ShoppingBag,
  Mic,
  Speaker,
  
  // Nature icons
  WbSunny,
  Cloud,
  Nature,
  Park,
  LocalFlorist,
  Pets,
  
  // Health icons
  MedicalServices,
  Psychology,
  
  // Food icons
  LocalPizza,
  Cake
};

const IconRenderer = ({ 
  iconName, 
  size = 24, 
  color = 'inherit', 
  sx = {},
  fallbackIcon = Star 
}) => {
  // Get the icon component from the map
  const IconComponent = iconMap[iconName] || fallbackIcon;
  
  return (
    <IconComponent
      sx={{
        fontSize: size,
        color: color,
        ...sx
      }}
    />
  );
};

export default IconRenderer;
