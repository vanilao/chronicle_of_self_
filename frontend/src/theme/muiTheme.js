import { createTheme } from '@mui/material/styles';

// Color palette matching Tailwind config
const colors = {
  light: {
    bg: '#FFFFFF',
    surface: '#F8F9FA',
    primary: '#A8D8FF',
    secondary: '#FFB3D9',
    tertiary: '#B4F8C8',
    text: '#1F2937',
    textSecondary: '#6B7280',
  },
  dark: {
    bg: '#1A1A2E',
    surface: '#16213E',
    primary: '#0F4C75',
    secondary: '#E94560',
    tertiary: '#3FC1C9',
    text: '#F5F5F5',
    textSecondary: '#BBBBBB',
  },
  neon: {
    cyan: '#00F5FF',
    magenta: '#FF00FF',
    yellow: '#FFFF00',
  }
};

// Create theme based on mode
export const createAppTheme = (mode) => {
  const isDark = mode === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: palette.primary,
        contrastText: palette.text,
      },
      secondary: {
        main: palette.secondary,
        contrastText: palette.text,
      },
      background: {
        default: palette.bg,
        paper: palette.surface,
      },
      text: {
        primary: palette.text,
        secondary: palette.textSecondary,
      },
      // Custom colors
      neon: colors.neon,
      tertiary: {
        main: palette.tertiary,
      },
    },
    typography: {
      fontFamily: '"IBM Plex Mono", monospace',
      h1: {
        fontFamily: 'VT323, monospace',
        fontWeight: 400,
      },
      h2: {
        fontFamily: 'VT323, monospace',
        fontWeight: 400,
      },
      h3: {
        fontFamily: 'VT323, monospace',
        fontWeight: 400,
      },
      h4: {
        fontFamily: 'VT323, monospace',
        fontWeight: 400,
      },
      h5: {
        fontFamily: 'VT323, monospace',
        fontWeight: 400,
      },
      h6: {
        fontFamily: 'VT323, monospace',
        fontWeight: 400,
      },
      button: {
        fontFamily: '"IBM Plex Mono", monospace',
        fontWeight: 700,
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            border: '3px solid black',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
              transform: 'translate(2px, 2px)',
            },
            '&:active': {
              boxShadow: '0px 0px 0px rgba(0,0,0,1)',
              transform: 'translate(4px, 4px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            border: '3px solid black',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '& fieldset': {
                borderWidth: 3,
                borderColor: 'black',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderWidth: 3,
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: '"IBM Plex Mono", monospace',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 8,
            border: '2px solid black',
          },
        },
      },
    },
  });
};

export default createAppTheme;
