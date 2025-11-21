import {
  FitnessCenter,
  MenuBook,
  SelfImprovement,
  Palette
} from '@mui/icons-material';

export const CATEGORY_CONFIG = {
  Body: {
    color: '#4ade80',      // Vibrant green
    bgColor: '#dcfce7',     // Light green
    borderColor: '#22c55e', // Medium green
    hoverBg: '#bbf7d0',     // Hover green
    icon: FitnessCenter,
    description: 'Physical wellness and fitness'
  },
  Mind: {
    color: '#60a5fa',      // Vibrant blue
    bgColor: '#dbeafe',     // Light blue
    borderColor: '#3b82f6', // Medium blue
    hoverBg: '#bfdbfe',     // Hover blue
    icon: MenuBook,
    description: 'Learning and mental growth'
  },
  Spirit: {
    color: '#c084fc',      // Vibrant purple
    bgColor: '#f3e8ff',     // Light purple
    borderColor: '#a855f7', // Medium purple
    hoverBg: '#e9d5ff',     // Hover purple
    icon: SelfImprovement,
    description: 'Mindfulness and inner peace'
  },
  Creative: {
    color: '#fb923c',      // Vibrant orange
    bgColor: '#fed7aa',     // Light orange
    borderColor: '#f97316', // Medium orange
    hoverBg: '#fdba74',     // Hover orange
    icon: Palette,
    description: 'Artistic expression and creativity'
  }
};

export const getCategoryConfig = (category) => {
  return CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Body;
};

export const getAllCategories = () => {
  return Object.keys(CATEGORY_CONFIG);
};
