import { createTheme } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useState } from 'react';

const RMain = '#c62828';
const RDark = '#8e0000';
const RLight = '#ff5f52';
const RcontrastText = '#ffffff';

const BMain = '#3f51b5';
const BDark = '#002984';
const BLight = '#757de8';
const BcontrastText = '#ffffff';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: BLight,
      main: BMain,
      dark: BDark,
      contrastText: BcontrastText,
    },
    secondary: {
      light: RLight,
      main: RMain,
      dark: RDark,
      contrastText: RcontrastText,
    },
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: RLight,
      main: RMain,
      dark: RDark,
      contrastText: RcontrastText,
    },
    secondary: {
      light: BLight,
      main: BMain,
      dark: BDark,
      contrastText: BcontrastText,
    },
  },
});
export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

type themeContextType = {
  colorTheme: 'light' | 'dark';
  changeColorTheme: () => void;
};

//Content Provider
//Maak hier te veel van en de app wordt sloom
//De enige 2 die we hier voor gebruiken is de User en de Theme
export const ThemeContext = React.createContext<Partial<themeContextType>>({
  colorTheme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  changeColorTheme: () => {},
});
export const ThemeProvider: FC = ({ children }) => {
  //FC = Function Component // Theme Provider maakt een <> aan
  const [colorTheme, setColorTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  const changeColorTheme = useCallback(() => {
    // Dit is een functie die switch van mode
    setColorTheme((prev) => {
      if (prev === 'light') {
        localStorage.setItem('theme', 'dark');
        return 'dark';
      }
      localStorage.setItem('theme', 'light');
      return 'light';
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        changeColorTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
