import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f4acb7',
      light: '#ffcad4',
      dark: '#e38c99',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d8bbff',
      light: '#e6d4ff',
      dark: '#c9a0dc',
      contrastText: '#333333',
    },
    accent: {
      main: '#d4af37',
      light: '#e5c860',
      dark: '#c09c2c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fff9f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontFamily: "'Dancing Script', cursive",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Dancing Script', cursive",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Dancing Script', cursive",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Great Vibes', cursive",
    },
    h5: {
      fontFamily: "'Great Vibes', cursive",
    },
    h6: {
      fontFamily: "'Great Vibes', cursive",
    },
    subtitle1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 300,
    },
    button: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    // ... resto de sombras
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '12px 24px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 