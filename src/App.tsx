import React, { useEffect } from 'react';
import './App.css';
import {Card, createTheme, ThemeProvider, useMediaQuery} from '@mui/material';
import Routes from './Routes';
import Background from './components/backgrounds/background';
import { darkTheme, lightTheme, ThemeProviderH, useThemeContext } from './components/theme-context';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const {theme, toggleDark} = useThemeContext();
  console.log(theme);
  console.log("Dark" + prefersDarkMode);
  useEffect(() => {
    console.log("Dark" + theme);
}, [theme]);
  

  return (
    <ThemeProviderH>
        <ThemeProvider theme={theme}>           
          <Routes/>
        </ThemeProvider>      
    </ThemeProviderH>
  );
}
export default App;

