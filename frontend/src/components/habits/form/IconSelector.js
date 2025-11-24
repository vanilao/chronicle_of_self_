import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CloseModalButton from '../ui/components/CloseModalButton';
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
  Cake,
  Search
} from '@mui/icons-material';

// Icon categories with their respective icons
const iconCategories = {
  all: {
    name: 'All',
    icons: [
      { name: 'Favorite', icon: Favorite, label: 'Heart' },
      { name: 'Star', icon: Star, label: 'Star' },
      { name: 'Home', icon: Home, label: 'Home' },
      { name: 'Person', icon: Person, label: 'Person' },
      { name: 'Settings', icon: Settings, label: 'Settings' },
      { name: 'Notifications', icon: Notifications, label: 'Bell' },
      { name: 'CalendarToday', icon: CalendarToday, label: 'Calendar' },
      { name: 'Mail', icon: Mail, label: 'Mail' },
      { name: 'FitnessCenter', icon: FitnessCenter, label: 'Fitness' },
      { name: 'LocalCafe', icon: LocalCafe, label: 'Coffee' },
      { name: 'Book', icon: Book, label: 'Book' },
      { name: 'Work', icon: Work, label: 'Work' },
      { name: 'MusicNote', icon: MusicNote, label: 'Music' },
      { name: 'Restaurant', icon: Restaurant, label: 'Food' },
      { name: 'DirectionsRun', icon: DirectionsRun, label: 'Running' },
      { name: 'SelfImprovement', icon: SelfImprovement, label: 'Meditation' },
      { name: 'School', icon: School, label: 'Learning' },
      { name: 'Code', icon: Code, label: 'Coding' },
      { name: 'Palette', icon: Palette, label: 'Art' },
      { name: 'Camera', icon: Camera, label: 'Photography' },
      { name: 'Headphones', icon: Headphones, label: 'Audio' },
      { name: 'SportsBasketball', icon: SportsBasketball, label: 'Sports' },
      { name: 'Pets', icon: Pets, label: 'Pets' },
      { name: 'LocalFlorist', icon: LocalFlorist, label: 'Nature' },
      { name: 'ShoppingBag', icon: ShoppingBag, label: 'Shopping' },
      { name: 'DirectionsBike', icon: DirectionsBike, label: 'Cycling' },
      { name: 'Pool', icon: Pool, label: 'Swimming' },
      { name: 'WbSunny', icon: WbSunny, label: 'Sun' },
      { name: 'Cloud', icon: Cloud, label: 'Weather' },
      { name: 'EmojiEvents', icon: EmojiEvents, label: 'Achievement' },
      { name: 'Lightbulb', icon: Lightbulb, label: 'Ideas' },
      { name: 'TrendingUp', icon: TrendingUp, label: 'Growth' },
      { name: 'CheckCircle', icon: CheckCircle, label: 'Complete' },
      { name: 'MedicalServices', icon: MedicalServices, label: 'Health' },
      { name: 'Psychology', icon: Psychology, label: 'Mind' },
      { name: 'Nature', icon: Nature, label: 'Nature' },
      { name: 'Park', icon: Park, label: 'Park' },
      { name: 'MenuBook', icon: MenuBook, label: 'Reading' },
      { name: 'Computer', icon: Computer, label: 'Computer' },
      { name: 'PhoneAndroid', icon: PhoneAndroid, label: 'Mobile' },
      { name: 'Brush', icon: Brush, label: 'Creative' },
      { name: 'PhotoCamera', icon: PhotoCamera, label: 'Camera' },
      { name: 'Mic', icon: Mic, label: 'Recording' },
      { name: 'Speaker', icon: Speaker, label: 'Sound' },
      { name: 'LocalPizza', icon: LocalPizza, label: 'Pizza' },
      { name: 'Cake', icon: Cake, label: 'Celebration' }
    ]
  },
  popular: {
    name: 'Popular',
    icons: [
      { name: 'Favorite', icon: Favorite, label: 'Heart' },
      { name: 'Star', icon: Star, label: 'Star' },
      { name: 'Home', icon: Home, label: 'Home' },
      { name: 'Person', icon: Person, label: 'Person' },
      { name: 'Settings', icon: Settings, label: 'Settings' },
      { name: 'Notifications', icon: Notifications, label: 'Bell' },
      { name: 'CalendarToday', icon: CalendarToday, label: 'Calendar' },
      { name: 'Mail', icon: Mail, label: 'Mail' }
    ]
  },
  fitness: {
    name: 'Fitness',
    icons: [
      { name: 'FitnessCenter', icon: FitnessCenter, label: 'Fitness' },
      { name: 'DirectionsRun', icon: DirectionsRun, label: 'Running' },
      { name: 'SelfImprovement', icon: SelfImprovement, label: 'Meditation' },
      { name: 'SportsBasketball', icon: SportsBasketball, label: 'Sports' },
      { name: 'DirectionsBike', icon: DirectionsBike, label: 'Cycling' },
      { name: 'Pool', icon: Pool, label: 'Swimming' }
    ]
  },
  learning: {
    name: 'Learning',
    icons: [
      { name: 'Book', icon: Book, label: 'Book' },
      { name: 'School', icon: School, label: 'Learning' },
      { name: 'Code', icon: Code, label: 'Coding' },
      { name: 'Lightbulb', icon: Lightbulb, label: 'Ideas' },
      { name: 'MenuBook', icon: MenuBook, label: 'Reading' },
      { name: 'Computer', icon: Computer, label: 'Computer' }
    ]
  },
  work: {
    name: 'Work',
    icons: [
      { name: 'Work', icon: Work, label: 'Work' },
      { name: 'TrendingUp', icon: TrendingUp, label: 'Growth' },
      { name: 'CheckCircle', icon: CheckCircle, label: 'Complete' },
      { name: 'EmojiEvents', icon: EmojiEvents, label: 'Achievement' },
      { name: 'Brush', icon: Brush, label: 'Creative' },
      { name: 'PhotoCamera', icon: PhotoCamera, label: 'Camera' }
    ]
  },
  lifestyle: {
    name: 'Lifestyle',
    icons: [
      { name: 'LocalCafe', icon: LocalCafe, label: 'Coffee' },
      { name: 'Restaurant', icon: Restaurant, label: 'Food' },
      { name: 'MusicNote', icon: MusicNote, label: 'Music' },
      { name: 'Headphones', icon: Headphones, label: 'Audio' },
      { name: 'ShoppingBag', icon: ShoppingBag, label: 'Shopping' },
      { name: 'Mic', icon: Mic, label: 'Recording' },
      { name: 'Speaker', icon: Speaker, label: 'Sound' }
    ]
  },
  nature: {
    name: 'Nature',
    icons: [
      { name: 'WbSunny', icon: WbSunny, label: 'Sun' },
      { name: 'Cloud', icon: Cloud, label: 'Weather' },
      { name: 'Nature', icon: Nature, label: 'Nature' },
      { name: 'Park', icon: Park, label: 'Park' },
      { name: 'LocalFlorist', icon: LocalFlorist, label: 'Plants' },
      { name: 'Pets', icon: Pets, label: 'Pets' }
    ]
  },
  health: {
    name: 'Health',
    icons: [
      { name: 'MedicalServices', icon: MedicalServices, label: 'Health' },
      { name: 'Psychology', icon: Psychology, label: 'Mind' },
      { name: 'Favorite', icon: Favorite, label: 'Heart' }
    ]
  },
  food: {
    name: 'Food',
    icons: [
      { name: 'LocalPizza', icon: LocalPizza, label: 'Pizza' },
      { name: 'Cake', icon: Cake, label: 'Celebration' },
      { name: 'Restaurant', icon: Restaurant, label: 'Food' },
      { name: 'LocalCafe', icon: LocalCafe, label: 'Coffee' }
    ]
  }
};

const IconSelector = ({ value, onChange, size = 24, color = '#666666', onColorChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconColor, setIconColor] = useState(color);
  const debounceTimeoutRef = useRef(null);
  
  const categories = Object.keys(iconCategories);
  
  const filteredIcons = iconCategories[selectedCategory].icons.filter(icon =>
    icon.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIconSelect = (iconName) => {
    onChange(iconName);
    setIsModalOpen(false); // Close modal after selection
  };

  const handleColorChange = useCallback((newColor) => {
    // Update local state immediately for responsive UI
    setIconColor(newColor);
    
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Debounce the callback to prevent excessive re-renders
    debounceTimeoutRef.current = setTimeout(() => {
      if (onColorChange) {
        onColorChange(newColor);
      }
    }, 100); // 100ms delay
  }, [onColorChange]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const getSelectedIcon = () => {
    if (!value) return null;
    for (const category of Object.values(iconCategories)) {
      const found = category.icons.find(icon => icon.name === value);
      if (found) return found;
    }
    return null;
  };

  const selectedIcon = getSelectedIcon();
  const SelectedIconComponent = selectedIcon?.icon;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Selected Icon Display - Clickable to Open Modal */}
      <Button
        onClick={handleOpenModal}
        sx={{
          width: '100%',
          height: 40, // Same height as input fields
          p: 1,
          border: '2px solid black',
          borderRadius: 2, // Match other elements
          textAlign: 'center',
          backgroundColor: 'transparent',
          textTransform: 'none',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.875rem',
          color: '#000',
          '&:hover': {
            backgroundColor: '#000',
            color: '#fff'
          }
        }}
      >
        {SelectedIconComponent ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <SelectedIconComponent sx={{ fontSize: 20, color: 'inherit' }} />
            <Typography variant="body2" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem' }}>
              {selectedIcon.label}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 20, 
              height: 20, 
              border: '2px dashed #ccc', 
              borderRadius: 1
            }} />
            <Typography variant="body2" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem' }}>
              Select icon
            </Typography>
          </Box>
        )}
      </Button>

      {/* Icon Selection Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        sx={{ zIndex: 13000 }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: '2px solid black',
            maxHeight: '80vh',
            width: 500,
            zIndex: 13001
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '1rem',
          borderBottom: '2px solid black',
          pb: 2,
          borderRadius: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>Choose Icon</Typography>
            <CloseModalButton 
              onClick={handleCloseModal}
              variant="minimal"
            />
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {/* Color Picker Section */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: 'text.secondary',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}
            >
              Icon Color
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <input
                  type="color"
                  value={iconColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  style={{
                    width: 50,
                    height: 50,
                    border: '2px solid black',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: 'transparent'
                  }}
                />
              </Box>
              <TextField
                size="small"
                value={iconColor}
                onChange={(e) => handleColorChange(e.target.value)}
                placeholder="#666666"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  width: 120,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                      borderWidth: '2px',
                      borderRadius: 2
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                      borderWidth: '2px'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                      borderWidth: '2px'
                    }
                  }
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: 'text.secondary',
                  fontSize: '0.75rem'
                }}
              >
                Click color or enter hex
              </Typography>
            </Box>
          </Box>

          {/* Category Navigation - Inline Buttons */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: 'text.secondary',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}
            >
              Categories
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              mb: 2
            }}>
              {categories.map((categoryKey) => (
                <Button
                  key={categoryKey}
                  onClick={() => setSelectedCategory(categoryKey)}
                  size="small"
                  variant={selectedCategory === categoryKey ? 'contained' : 'outlined'}
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    borderWidth: '2px',
                    borderColor: 'black',
                    borderStyle: 'solid',
                    backgroundColor: selectedCategory === categoryKey ? '#000' : 'transparent',
                    color: selectedCategory === categoryKey ? '#fff' : '#000',
                    '&:hover': {
                      backgroundColor: selectedCategory === categoryKey ? '#333' : '#f5f5f5',
                      borderWidth: '2px',
                      borderColor: 'black',
                      borderStyle: 'solid'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {iconCategories[categoryKey].name}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                '& fieldset': {
                  borderColor: 'black',
                  borderWidth: '2px',
                  borderRadius: 2
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                  borderWidth: '2px'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                  borderWidth: '2px'
                }
              }
            }}
          />

          {/* Icon Grid */}
          <Box sx={{ 
            maxHeight: 400, 
            overflowY: 'auto',
            overflowX: 'hidden',
            border: '2px solid black',
            borderRadius: 2,
            p: 2,
            backgroundColor: '#ffffff'
          }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 1.5 
            }}>
              {filteredIcons.map((iconData) => {
                const IconComponent = iconData.icon;
                const isSelected = value === iconData.name;
                
                return (
                  <Box
                    key={iconData.name}
                    onClick={() => handleIconSelect(iconData.name)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 1.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: '2px solid black',
                      backgroundColor: isSelected ? '#000' : 'transparent',
                      '&:hover': {
                        backgroundColor: isSelected ? '#333' : '#f5f5f5',
                        border: '2px solid black'
                      },
                      transition: 'all 0.2s ease',
                      minHeight: 70
                    }}
                    title={iconData.label}
                  >
                    <IconComponent sx={{ 
                      fontSize: size, 
                      color: isSelected ? '#fff' : iconColor, 
                      mb: 0.5 
                    }} />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: '0.625rem',
                        textAlign: 'center',
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: isSelected ? '#fff' : '#666666',
                        lineHeight: 1
                      }}
                    >
                      {iconData.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            
            {filteredIcons.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono", monospace' }}>
                  No icons found
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          borderTop: '2px solid black',
          p: 2,
          borderRadius: 2
        }}>
          <Button 
            onClick={handleCloseModal}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              textTransform: 'none',
              border: '2px solid black',
              borderRadius: 2,
              px: 3,
              py: 1,
              backgroundColor: 'transparent',
              color: '#000',
              fontSize: '0.875rem',
              '&:hover': {
                backgroundColor: '#000',
                color: '#fff'
              }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IconSelector;
