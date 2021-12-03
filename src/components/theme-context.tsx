import { createTheme, Theme } from "@mui/material";
import React, { useState, createContext, FC, useContext } from "react";

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
// export const ThemeContext = React.createContext({
//     theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme, 
//     toggleTheme: () => {
//         this.theme === darkTheme ? theme = lightTheme : theme = darkTheme;
//     }
// });

// Mode Context - src/context/Mode
// interface modeProps {    
//     children?: React.ReactNode;
//     Mode?: Theme;
// }

// const ModeContext = React.createContext(undefined);

// const defaultMode = {
//   theme: "light",
// };

// export const ModeProvider = ({ children :React.ReactNode , Mode }) => {
//   const [currentMode, setCurrentMode] = useState(
//     Mode || defaultMode
//   );

//   const saveMode = (values) => {
//    setCurrentMode(values)
//   };

//   return (
//     <ModeContext.Provider
//       value={{ Mode: currentMode, saveMode }}
//     >
//       {children}
//     </ModeContext.Provider>
//   );
// };

// export const ModeConsumer = ModeContext.Consumer;

// export default ModeContext;



interface IThemeContext {
  theme: Theme;
  toggleDark?: () => void;
}

const defaultState = {
  theme: themes.dark,
};

const ThemeContext = React.createContext<IThemeContext>(defaultState);
export default ThemeContext;

export const ThemeProviderH: FC = ({ children }) => {
  const [theme, setDark] = useState<Theme>(themes.dark);

  const toggleDark = () => {
    setDark(themes.light);
    console.log("toggleDark");
    console.log(theme === themes.dark);
    console.log(theme === themes.light ? "Light" : "Dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useThemeContext = () =>  useContext(ThemeContext);
