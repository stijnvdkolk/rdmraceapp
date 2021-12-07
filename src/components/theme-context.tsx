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


export const ThemeContext = React.createContext<Partial<themeContextType>>({});
export const ThemeProvider : FC = ({ children  }) => {
  const [colorTheme, setColorTheme] = useState<"light" | "dark">("light");

  const changeColorTheme = useCallback(() => {
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
