import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Chip,
  Slider
} from '@mui/material';
import {
  Search,
  Favorite,
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
  Home,
  DirectionsBike,
  Pool,
  Bedtime,
  WbSunny,
  Cloud,
  EmojiEvents,
  Star,
  Lightbulb,
  GpsFixed,
  TrendingUp,
  CheckCircle,
  SportsSoccer,
  DirectionsWalk,
  Hiking,
  Skateboarding,
  SportsHandball,
  SportsTennis,
  HealthAndSafety,
  Healing,
  MedicalServices,
  Psychology,
  Air,
  Nature,
  Park,
  Yard,
  Forest,
  MenuBook,
  SchoolSharp,
  Computer,
  Laptop,
  PhoneAndroid,
  Tablet,
  Devices,
  Brush,
  ColorLens,
  PhotoCamera,
  Videocam,
  Mic,
  Headset,
  Speaker,
  MusicVideo,
  LibraryMusic,
  SportsEsports,
  VideogameAsset,
  Casino,
  SportsBar,
  Nightlife,
  TheaterComedy,
  Celebration,
  Cake,
  LocalPizza,
  LocalDining,
  RamenDining,
  Icecream,
  Liquor,
  LocalBar,
  Coffee,
  CoffeeMaker,
  Kitchen,
  DinnerDining,
  SetMeal,
  Fastfood,
  LunchDining,
  Tapas,
  BakeryDining,
  RestaurantMenu,
  RoomService,
  FreeBreakfast,
  BrunchDining
} from '@mui/icons-material';

// Icon categories with their icons
const iconCategories = {
  activities: [
    { name: 'fitness_center', icon: FitnessCenter, label: 'Fitness' },
    { name: 'directions_run', icon: DirectionsRun, label: 'Running' },
    { name: 'self_improvement', icon: SelfImprovement, label: 'Meditation' },
    { name: 'sports_basketball', icon: SportsBasketball, label: 'Basketball' },
    { name: 'directions_bike', icon: DirectionsBike, label: 'Cycling' },
    { name: 'pool', icon: Pool, label: 'Swimming' },
    { name: 'sports_soccer', icon: SportsSoccer, label: 'Soccer' },
    { name: 'directions_walk', icon: DirectionsWalk, label: 'Walking' },
    { name: 'hiking', icon: Hiking, label: 'Hiking' },
    { name: 'skateboarding', icon: Skateboarding, label: 'Skateboarding' },
    { name: 'sports_handball', icon: SportsHandball, label: 'Handball' },
    { name: 'sports_tennis', icon: SportsTennis, label: 'Tennis' }
  ],
  wellness: [
    { name: 'self_improvement', icon: SelfImprovement, label: 'Meditation' },
    { name: 'spa', icon: Bedtime, label: 'Relaxation' },
    { name: 'favorite', icon: Favorite, label: 'Self-care' },
    { name: 'local_florist', icon: LocalFlorist, label: 'Nature' },
    { name: 'pets', icon: Pets, label: 'Pet Care' },
    { name: 'heart', icon: Favorite, label: 'Health' },
    { name: 'health_and_safety', icon: HealthAndSafety, label: 'Safety' },
    { name: 'healing', icon: Healing, label: 'Healing' },
    { name: 'medical_services', icon: MedicalServices, label: 'Medical' },
    { name: 'psychology', icon: Psychology, label: 'Mental' }
  ],
  learning: [
    { name: 'book', icon: Book, label: 'Reading' },
    { name: 'school', icon: School, label: 'Study' },
    { name: 'code', icon: Code, label: 'Coding' },
    { name: 'lightbulb', icon: Lightbulb, label: 'Ideas' },
    { name: 'palette', icon: Palette, label: 'Creativity' },
    { name: 'camera', icon: Camera, label: 'Photography' },
    { name: 'menu_book', icon: MenuBook, label: 'Books' },
    { name: 'school_sharp', icon: SchoolSharp, label: 'Education' },
    { name: 'computer', icon: Computer, label: 'Computer' },
    { name: 'laptop', icon: Laptop, label: 'Laptop' },
    { name: 'phone_android', icon: PhoneAndroid, label: 'Mobile' },
    { name: 'tablet', icon: Tablet, label: 'Tablet' },
    { name: 'devices', icon: Devices, label: 'Devices' }
  ],
  work: [
    { name: 'work', icon: Work, label: 'Work' },
    { name: 'trending_up', icon: TrendingUp, label: 'Productivity' },
    { name: 'target', icon: GpsFixed, label: 'Goals' },
    { name: 'check_circle', icon: CheckCircle, label: 'Tasks' },
    { name: 'emoji_events', icon: EmojiEvents, label: 'Achievement' },
    { name: 'star', icon: Star, label: 'Excellence' },
    { name: 'brush', icon: Brush, label: 'Design' },
    { name: 'color_lens', icon: ColorLens, label: 'Art' },
    { name: 'photo_camera', icon: PhotoCamera, label: 'Photo' },
    { name: 'videocam', icon: Videocam, label: 'Video' }
  ],
  lifestyle: [
    { name: 'local_cafe', icon: LocalCafe, label: 'Coffee' },
    { name: 'restaurant', icon: Restaurant, label: 'Dining' },
    { name: 'music_note', icon: MusicNote, label: 'Music' },
    { name: 'headphones', icon: Headphones, label: 'Audio' },
    { name: 'shopping_bag', icon: ShoppingBag, label: 'Shopping' },
    { name: 'home', icon: Home, label: 'Home' },
    { name: 'mic', icon: Mic, label: 'Recording' },
    { name: 'headset', icon: Headset, label: 'Headset' },
    { name: 'speaker', icon: Speaker, label: 'Speaker' },
    { name: 'music_video', icon: MusicVideo, label: 'Music Video' },
    { name: 'library_music', icon: LibraryMusic, label: 'Library' },
    { name: 'sports_esports', icon: SportsEsports, label: 'Gaming' },
    { name: 'videogame_asset', icon: VideogameAsset, label: 'Gaming' },
    { name: 'casino', icon: Casino, label: 'Casino' },
    { name: 'sports_bar', icon: SportsBar, label: 'Bar' },
    { name: 'nightlife', icon: Nightlife, label: 'Nightlife' },
    { name: 'theater_comedy', icon: TheaterComedy, label: 'Theater' }
  ],
  food: [
    { name: 'local_pizza', icon: LocalPizza, label: 'Pizza' },
    { name: 'local_dining', icon: LocalDining, label: 'Dining' },
    { name: 'ramen_dining', icon: RamenDining, label: 'Ramen' },
    { name: 'icecream', icon: Icecream, label: 'Ice Cream' },
    { name: 'liquor', icon: Liquor, label: 'Drinks' },
    { name: 'local_bar', icon: LocalBar, label: 'Bar' },
    { name: 'coffee', icon: Coffee, label: 'Coffee' },
    { name: 'coffee_maker', icon: CoffeeMaker, label: 'Coffee Maker' },
    { name: 'kitchen', icon: Kitchen, label: 'Kitchen' },
    { name: 'dinner_dining', icon: DinnerDining, label: 'Dinner' },
    { name: 'set_meal', icon: SetMeal, label: 'Meal' },
    { name: 'fastfood', icon: Fastfood, label: 'Fast Food' },
    { name: 'lunch_dining', icon: LunchDining, label: 'Lunch' },
    { name: 'tapas', icon: Tapas, label: 'Tapas' },
    { name: 'bakery_dining', icon: BakeryDining, label: 'Bakery' },
    { name: 'restaurant_menu', icon: RestaurantMenu, label: 'Menu' },
    { name: 'room_service', icon: RoomService, label: 'Service' },
    { name: 'free_breakfast', icon: FreeBreakfast, label: 'Breakfast' },
    { name: 'brunch_dining', icon: BrunchDining, label: 'Brunch' },
    { name: 'cake', icon: Cake, label: 'Cake' },
    { name: 'celebration', icon: Celebration, label: 'Party' }
  ],
  nature: [
    { name: 'local_florist', icon: LocalFlorist, label: 'Plants' },
    { name: 'pets', icon: Pets, label: 'Animals' },
    { name: 'wb_sunny', icon: WbSunny, label: 'Sun' },
    { name: 'cloud', icon: Cloud, label: 'Weather' },
    { name: 'directions_bike', icon: DirectionsBike, label: 'Outdoors' },
    { name: 'pool', icon: Pool, label: 'Water' },
    { name: 'air', icon: Air, label: 'Air' },
    { name: 'nature', icon: Nature, label: 'Nature' },
    { name: 'park', icon: Park, label: 'Park' },
    { name: 'yard', icon: Yard, label: 'Yard' },
    { name: 'forest', icon: Forest, label: 'Forest' }
  ]
};

const IconSelector = ({ selectedIcon, selectedColor, onIconSelect, onColorChange, onSkip }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [iconColor, setIconColor] = useState(selectedColor || '#1976d2');
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryKeys = Object.keys(iconCategories);

  // Update color when prop changes
  React.useEffect(() => {
    if (selectedColor) {
      setIconColor(selectedColor);
    }
  }, [selectedColor]);

  // Handle color change
  const handleColorChange = (event, newValue) => {
    const color = `hsl(${newValue}, 70%, 50%)`;
    setIconColor(color);
    onColorChange(color);
  };

  // Get all icons for display
  const allIcons = useMemo(() => {
    const flatIcons = [];
    categoryKeys.forEach(category => {
      iconCategories[category].forEach(icon => {
        flatIcons.push({ ...icon, category });
      });
    });
    return flatIcons;
  }, [categoryKeys]);

  // Filter icons based on search term and category
  const filteredIcons = useMemo(() => {
    let icons = activeTab === 0
      ? allIcons
      : iconCategories[categoryKeys[activeTab - 1]] || [];

    if (searchTerm) {
      icons = icons.filter(icon =>
        icon.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return icons;
  }, [searchTerm, activeTab, allIcons, categoryKeys]);

  // Get popular/recommended icons - More comprehensive selection
  const popularIcons = useMemo(() => [
    iconCategories.activities[0], // Fitness
    iconCategories.activities[1], // Running
    iconCategories.wellness[0], // Meditation
    iconCategories.learning[0], // Reading
    iconCategories.work[1], // Productivity
    iconCategories.lifestyle[0], // Coffee
    iconCategories.activities[4], // Cycling
    iconCategories.wellness[2], // Self-care
    iconCategories.learning[2], // Coding
    iconCategories.nature[0], // Plants
    iconCategories.food[0], // Pizza
    iconCategories.lifestyle[2], // Music
  ], []);

  const handleIconSelect = (iconName) => {
    onIconSelect(iconName);
    setIsExpanded(false);
  };

  const selectedIconData = useMemo(() => {
    return allIcons.find(icon => icon.name === selectedIcon);
  }, [selectedIcon, allIcons]);

  return (
    <Box>
      {/* Selected Icon Display / Quick Select */}
      {!isExpanded ? (
        <Box>
          {/* Selected Icon Preview - Show First if Selected */}
          {selectedIconData && (
            <Box sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              border: '3px solid black',
              boxShadow: '4px 4px 0px rgba(0,0,0,1)',
              bgcolor: 'secondary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}>
              {(() => {
                const IconComponent = selectedIconData.icon;
                return <IconComponent sx={{ fontSize: 28, color: 'text.primary' }} />;
              })()}
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.625rem',
                    color: 'text.secondary',
                    textTransform: 'uppercase'
                  }}
                >
                  Selected Icon
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'text.primary'
                  }}
                >
                  {selectedIconData.label}
                </Typography>
              </Box>
              <Box
                onClick={onSkip}
                sx={{
                  cursor: 'pointer',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  border: '2px solid black',
                  bgcolor: 'background.default',
                  '&:hover': {
                    bgcolor: 'background.paper'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  Clear
                </Typography>
              </Box>
            </Box>
          )}

          {/* Quick Pick Icons */}
          <Box>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: 'text.secondary',
                mb: 1.5,
                fontWeight: 600
              }}
            >
              Popular Icons
            </Typography>
            <Grid container spacing={1.5}>
              {popularIcons.map((iconData) => {
                const IconComponent = iconData.icon;
                const isSelected = selectedIcon === iconData.name;

                return (
                  <Grid item xs={4} sm={3} md={2} key={iconData.name}>
                    <Box
                      onClick={() => handleIconSelect(iconData.name)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleIconSelect(iconData.name);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${iconData.name} icon`}
                      aria-pressed={isSelected}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: '3px solid black',
                        boxShadow: isSelected ? '4px 4px 0px rgba(0,0,0,1)' : '2px 2px 0px rgba(0,0,0,0.3)',
                        bgcolor: isSelected ? 'secondary.main' : 'background.default',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0.75,
                        minHeight: '85px',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          borderColor: 'secondary.main',
                          bgcolor: isSelected ? 'secondary.main' : 'secondary.light',
                          transform: 'translateY(-2px)',
                          boxShadow: '4px 6px 0px rgba(0,0,0,1)'
                        },
                        '&:active': {
                          transform: 'translateY(0px)',
                          boxShadow: '2px 2px 0px rgba(0,0,0,1)'
                        }
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 32,
                          color: iconColor,
                          transition: 'all 0.2s'
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.625rem',
                          display: 'block',
                          color: 'text.primary',
                          lineHeight: 1.2,
                          fontWeight: 600,
                          textAlign: 'center'
                        }}
                      >
                        {iconData.label}
                      </Typography>
                      {isSelected && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                            border: '2px solid black'
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Browse More / Skip */}
          <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
            <Box
              onClick={() => setIsExpanded(true)}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                bgcolor: 'primary.main',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '5px 6px 0px rgba(0,0,0,1)',
                  bgcolor: 'primary.dark'
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '2px 2px 0px rgba(0,0,0,1)'
                }
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'white'
                }}
              >
                Browse All Icons →
              </Typography>
            </Box>

            {onSkip && !selectedIconData && (
              <Box
                onClick={onSkip}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  border: '3px solid black',
                  boxShadow: '3px 3px 0px rgba(0,0,0,1)',
                  bgcolor: 'background.default',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    bgcolor: 'background.paper'
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                    boxShadow: '2px 2px 0px rgba(0,0,0,1)'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'text.secondary'
                  }}
                >
                  Skip
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          {/* Color Picker Section */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                p: 2,
                border: '3px solid black',
                borderRadius: 2,
                bgcolor: 'background.default',
                boxShadow: '3px 3px 0px rgba(0,0,0,0.3)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'text.primary'
                  }}
                >
                  ICON COLOR
                </Typography>
                {selectedIcon && (
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      border: '3px solid black',
                      boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                      bgcolor: iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    {(() => {
                      const selectedIconData = allIcons.find(icon => icon.name === selectedIcon);
                      if (selectedIconData) {
                        const IconComponent = selectedIconData.icon;
                        return <IconComponent sx={{ fontSize: 32, color: 'white' }} />;
                      }
                      return <Search sx={{ fontSize: 32, color: 'white', opacity: 0.5 }} />;
                    })()}
                  </Box>
                )}
              </Box>

              {/* Preset Colors */}
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    mb: 1.5,
                    fontWeight: 600
                  }}
                >
                  Quick Colors
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  {[
                    { color: '#f44336', name: 'Red' },
                    { color: '#e91e63', name: 'Pink' },
                    { color: '#9c27b0', name: 'Purple' },
                    { color: '#673ab7', name: 'Deep Purple' },
                    { color: '#3f51b5', name: 'Indigo' },
                    { color: '#2196f3', name: 'Blue' },
                    { color: '#03a9f4', name: 'Light Blue' },
                    { color: '#00bcd4', name: 'Cyan' },
                    { color: '#009688', name: 'Teal' },
                    { color: '#4caf50', name: 'Green' },
                    { color: '#8bc34a', name: 'Light Green' },
                    { color: '#cddc39', name: 'Lime' },
                    { color: '#ffeb3b', name: 'Yellow' },
                    { color: '#ffc107', name: 'Amber' },
                    { color: '#ff9800', name: 'Orange' },
                    { color: '#ff5722', name: 'Deep Orange' },
                    { color: '#795548', name: 'Brown' },
                    { color: '#607d8b', name: 'Blue Grey' },
                    { color: '#000000', name: 'Black' },
                    { color: '#666666', name: 'Grey' }
                  ].map(({ color, name }) => (
                    <Box
                      key={color}
                      onClick={() => {
                        const hexToHsl = (hex) => {
                          const r = parseInt(hex.slice(1, 3), 16) / 255;
                          const g = parseInt(hex.slice(3, 5), 16) / 255;
                          const b = parseInt(hex.slice(5, 7), 16) / 255;
                          const max = Math.max(r, g, b);
                          const min = Math.min(r, g, b);
                          let h;
                          if (max === min) {
                            h = 0;
                          } else {
                            const d = max - min;
                            switch (max) {
                              case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                              case g: h = ((b - r) / d + 2) / 6; break;
                              case b: h = ((r - g) / d + 4) / 6; break;
                              default: h = 0; break;
                            }
                          }
                          return `hsl(${Math.round(h * 360)}, 70%, 50%)`;
                        };
                        const hslColor = hexToHsl(color);
                        setIconColor(hslColor);
                        onColorChange(hslColor);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          const hexToHsl = (hex) => {
                            const r = parseInt(hex.slice(1, 3), 16) / 255;
                            const g = parseInt(hex.slice(3, 5), 16) / 255;
                            const b = parseInt(hex.slice(5, 7), 16) / 255;
                            const max = Math.max(r, g, b);
                            const min = Math.min(r, g, b);
                            let h;
                            if (max === min) {
                              h = 0;
                            } else {
                              const d = max - min;
                              switch (max) {
                                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                                case g: h = ((b - r) / d + 2) / 6; break;
                                case b: h = ((r - g) / d + 4) / 6; break;
                                default: h = 0; break;
                              }
                            }
                            return `hsl(${Math.round(h * 360)}, 70%, 50%)`;
                          };
                          const hslColor = hexToHsl(color);
                          setIconColor(hslColor);
                          onColorChange(hslColor);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${name} color`}
                      aria-pressed={iconColor.includes(color.slice(1, 3))}
                      title={name}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: color,
                        border: '3px solid',
                        borderColor: iconColor.includes(color.slice(1, 3)) ? 'black' : 'transparent',
                        boxShadow: iconColor.includes(color.slice(1, 3))
                          ? '3px 3px 0px rgba(0,0,0,1)'
                          : '2px 2px 0px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.15) translateY(-2px)',
                          boxShadow: '3px 4px 0px rgba(0,0,0,1)',
                          borderColor: 'black'
                        },
                        '&:active': {
                          transform: 'scale(1.05)',
                          boxShadow: '1px 1px 0px rgba(0,0,0,1)'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Custom Color Slider */}
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    mb: 1.5,
                    fontWeight: 600
                  }}
                >
                  Custom Hue ({parseInt(iconColor.match(/hsl\((\d+)/)?.[1] || 0)}°)
                </Typography>
                <Slider
                  value={parseInt(iconColor.match(/hsl\((\d+)/)?.[1] || 0)}
                  onChange={handleColorChange}
                  min={0}
                  max={360}
                  step={1}
                  sx={{
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                      border: '3px solid black',
                      boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                      bgcolor: iconColor,
                      '&:hover': {
                        boxShadow: '3px 3px 0px rgba(0,0,0,1)',
                      },
                      '&.Mui-active': {
                        boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                      }
                    },
                    '& .MuiSlider-track': {
                      background: 'linear-gradient(to right, hsl(0, 70%, 50%), hsl(60, 70%, 50%), hsl(120, 70%, 50%), hsl(180, 70%, 50%), hsl(240, 70%, 50%), hsl(300, 70%, 50%), hsl(360, 70%, 50%))',
                      border: '2px solid black',
                      height: 12,
                      borderRadius: 1
                    },
                    '& .MuiSlider-rail': {
                      background: 'linear-gradient(to right, hsl(0, 70%, 50%), hsl(60, 70%, 50%), hsl(120, 70%, 50%), hsl(180, 70%, 50%), hsl(240, 70%, 50%), hsl(300, 70%, 50%), hsl(360, 70%, 50%))',
                      border: '2px solid black',
                      height: 12,
                      borderRadius: 1,
                      opacity: 1
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Search Bar */}
          <TextField
            fullWidth
            size="medium"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1.5, color: 'text.secondary', fontSize: 24 }} />
            }}
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '3px solid black',
                borderRadius: 2,
                bgcolor: 'background.default',
                boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
                '& fieldset': {
                  border: 'none'
                },
                '&:hover': {
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.4)',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s'
                },
                '&.Mui-focused': {
                  bgcolor: 'background.paper',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.6)'
                }
              }
            }}
          />

          {/* Category Filter Chips */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
            <Chip
              label="All"
              onClick={() => setActiveTab(0)}
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                height: 36,
                bgcolor: activeTab === 0 ? 'primary.main' : 'background.default',
                color: activeTab === 0 ? 'white' : 'text.primary',
                border: '3px solid black',
                borderRadius: 2,
                boxShadow: activeTab === 0 ? '3px 3px 0px rgba(0,0,0,1)' : '2px 2px 0px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: activeTab === 0 ? 'primary.dark' : 'background.paper',
                  transform: 'translateY(-2px)',
                  boxShadow: '3px 4px 0px rgba(0,0,0,1)'
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '1px 1px 0px rgba(0,0,0,1)'
                }
              }}
            />
            {categoryKeys.map((category, index) => (
              <Chip
                key={category}
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                onClick={() => setActiveTab(index + 1)}
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  height: 36,
                  bgcolor: activeTab === index + 1 ? 'primary.main' : 'background.default',
                  color: activeTab === index + 1 ? 'white' : 'text.primary',
                  border: '3px solid black',
                  borderRadius: 2,
                  boxShadow: activeTab === index + 1 ? '3px 3px 0px rgba(0,0,0,1)' : '2px 2px 0px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: activeTab === index + 1 ? 'primary.dark' : 'background.paper',
                    transform: 'translateY(-2px)',
                    boxShadow: '3px 4px 0px rgba(0,0,0,1)'
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                    boxShadow: '1px 1px 0px rgba(0,0,0,1)'
                  }
                }}
              />
            ))}
          </Box>

          {/* Icon Grid - Improved */}
          <Box
            sx={{
              maxHeight: 320,
              overflowY: 'auto',
              mb: 2,
              border: '3px solid black',
              borderRadius: 2,
              p: 2,
              bgcolor: 'background.paper',
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)',
              '&::-webkit-scrollbar': {
                width: '8px'
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'background.default',
                borderRadius: 1
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'text.secondary',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'text.primary'
                }
              }
            }}
          >
            <Grid container spacing={1.5}>
              {filteredIcons.map((iconData) => {
                const IconComponent = iconData.icon;
                const isSelected = selectedIcon === iconData.name;

                return (
                  <Grid item xs={4} sm={3} md={2} key={iconData.name}>
                    <Box
                      onClick={() => handleIconSelect(iconData.name)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleIconSelect(iconData.name);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${iconData.name} icon`}
                      aria-pressed={isSelected}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: '3px solid',
                        borderColor: isSelected ? 'secondary.main' : '#e0e0e0',
                        bgcolor: isSelected ? 'secondary.light' : 'background.default',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0.5,
                        minHeight: '75px',
                        justifyContent: 'center',
                        position: 'relative',
                        boxShadow: isSelected ? '3px 3px 0px rgba(0,0,0,0.8)' : '1px 1px 0px rgba(0,0,0,0.2)',
                        '&:hover': {
                          borderColor: 'secondary.main',
                          bgcolor: 'secondary.light',
                          transform: 'translateY(-2px)',
                          boxShadow: '3px 4px 0px rgba(0,0,0,0.8)'
                        },
                        '&:active': {
                          transform: 'translateY(0px)',
                          boxShadow: '1px 1px 0px rgba(0,0,0,0.8)'
                        }
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 28,
                          color: iconColor,
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.625rem',
                          color: 'text.primary',
                          textAlign: 'center',
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '100%',
                          fontWeight: isSelected ? 700 : 500
                        }}
                      >
                        {iconData.label}
                      </Typography>
                      {isSelected && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                            border: '2px solid black',
                            boxShadow: '0 0 0 2px white'
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            {filteredIcons.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 4
                }}
              >
                <Search sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontSize: '0.875rem'
                  }}
                >
                  No icons found
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    textAlign: 'center',
                    color: 'text.disabled',
                    fontSize: '0.75rem',
                    mt: 0.5
                  }}
                >
                  Try a different search term
                </Typography>
              </Box>
            )}
          </Box>

          {/* Collapse Button */}
          <Box
            onClick={() => setIsExpanded(false)}
            sx={{
              py: 2,
              borderRadius: 2,
              border: '3px solid black',
              boxShadow: '5px 5px 0px rgba(0,0,0,1)',
              bgcolor: selectedIcon ? 'success.main' : 'background.default',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: '6px 7px 0px rgba(0,0,0,1)',
                transform: 'translateY(-2px)',
                bgcolor: selectedIcon ? 'success.dark' : 'background.paper'
              },
              '&:active': {
                boxShadow: '3px 3px 0px rgba(0,0,0,1)',
                transform: 'translateY(0px)'
              }
            }}
          >
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '1rem',
                fontWeight: 700,
                color: selectedIcon ? 'white' : 'text.primary'
              }}
            >
              {selectedIcon ? '✓ Done' : 'Close'}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default IconSelector;
