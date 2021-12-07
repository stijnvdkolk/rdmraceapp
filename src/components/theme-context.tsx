import { createTheme } from "@mui/material";
import React, { FC, useCallback } from "react";
import { useState } from "react";

export const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
});
export const lightTheme = createTheme({
    palette: {
      mode: 'light'
    },
});
export const themes = {
    dark: darkTheme,
    light: lightTheme,
};

type themeContextType = {
  colorTheme: "light" | "dark";
  changeColorTheme: () => void;
}

//Content Provider
//Maak hier te veel van en de app wordt sloom
//De enige 2 die we hier voor gebruiken is de User en de Theme
export const ThemeContext = React.createContext<Partial<themeContextType>>({});
export const ThemeProvider : FC = ({ children  }) => {  //FC = Function Component // Theme Provider maakt een <> aan
  const [colorTheme, setColorTheme] = useState<"light" | "dark">("light");

  const changeColorTheme = useCallback(() => { // Dit is een functie die switch van mode
    setColorTheme((prev) => {
      if (prev === "light") {
        return "dark";
      }
      return "light";
    })
  }, []);

  return (
    <ThemeContext.Provider value={{
      colorTheme,
      changeColorTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
