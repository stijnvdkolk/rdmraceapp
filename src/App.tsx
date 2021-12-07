/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react';
import './App.css';
import {ThemeProvider} from '@mui/material';
import Routes from './Routes';
import { darkTheme, lightTheme, ThemeContext } from './components/theme-context';
import { useLocalStorage } from 'react-use';



function App() {
  const { changeColorTheme, colorTheme } =  useContext(ThemeContext);
  return (
    <ThemeProvider theme={colorTheme === "light" ? lightTheme : darkTheme}>
      <div id="out" className="App red background">       
        <Routes />
      </div>    
    </ThemeProvider>
  );
}
export default App;

