import { createMuiTheme } from '@material-ui/core/styles';

const primaryGradient = gradient => {
  return `rgba(53, 119, 53, ${gradient})`;
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryGradient(1),
      gradient80: primaryGradient(0.8),
      gradient60: primaryGradient(0.6),
      gradient40: primaryGradient(0.4),
      gradient20: primaryGradient(0.2),
      gradient10: primaryGradient(0.1),
    },
    base: {
      primary: '#FEF9EE',
      secondary: '#F6EDD9',
      tertiary: '#EFEEE5',
    },
    secondary: {
      main: '#52944F',
    },
    tertiary: {
      main: '#6FB26B',
    },
    quaternary: {
      main: '#8DD187',
    },
    grey: {
      main: '#F3F3F3',
      medium: '#DCDCDD',
      darker: '#8A8A8E',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    color: '#212121',
  },
});

export default theme;
