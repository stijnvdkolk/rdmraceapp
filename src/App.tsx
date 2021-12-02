import React from 'react';
import './App.css';
import {Card, createTheme, ThemeProvider, useMediaQuery} from '@mui/material';
import Routes from './Routes';
import Background from './components/backgrounds/background';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  console.log("Dark" + prefersDarkMode);
  const theme = React.useMemo(
    () =>
    createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light'

        },
        
        
      }),
    [prefersDarkMode],
  );
  

  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );
}
export default App;

