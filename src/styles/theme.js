import { createTheme } from '@mui/material/styles';

// HoodMandu Brand Colors
const colors = {
  primary: {
    main: '#0066FF', // Electric Blue
    light: '#3385FF',
    dark: '#0052CC',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#000000',
    light: '#333333',
    dark: '#000000',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#0A0A0A',
    grey: '#1A1A1A',
  },
  text: {
    primary: '#0A0A0A',
    secondary: '#666666',
    light: '#FFFFFF',
    muted: '#999999',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

// Custom Typography
const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  h2: {
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: 'clamp(1.75rem, 4vw, 3rem)',
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  h3: {
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
  },
  h4: {
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
  },
  h5: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '1.1rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.95rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem',
    fontWeight: 400,
    lineHeight: 1.7,
  },
  body2: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.8rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  subtitle1: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.03em',
  },
  overline: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
};

// Theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    ...colors,
  },
  typography,
  shape: {
    borderRadius: 0, // Sharp edges for brutalist aesthetic
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: '#FFFFFF',
          color: '#0A0A0A',
          overflowX: 'hidden',
        },
        '::selection': {
          backgroundColor: '#0066FF',
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '14px 32px',
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#0066FF',
          '&:hover': {
            backgroundColor: '#0052CC',
          },
        },
        containedSecondary: {
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#1A1A1A',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(0, 102, 255, 0.04)',
          },
        },
        outlinedSecondary: {
          borderColor: '#000000',
          color: '#000000',
          '&:hover': {
            borderColor: '#000000',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        sizeLarge: {
          padding: '18px 48px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '10px 20px',
          fontSize: '0.75rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderWidth: 2,
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0066FF',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid #E0E0E0',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: '#000000',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 600,
          letterSpacing: '0.03em',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&:hover': {
            backgroundColor: 'rgba(0, 102, 255, 0.08)',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          borderRadius: 0,
          fontWeight: 700,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#000000',
          borderRadius: 0,
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '8px 12px',
        },
      },
    },
  },
});

export default theme;