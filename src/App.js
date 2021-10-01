/* eslint-disable no-console */
import React from 'react';
import Routes from './Routes';
import { AppProvider } from './context/AppProvider';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {(console.log = console.warn = console.error = () => {})}
      <CssBaseline />
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
export default App;
