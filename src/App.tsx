import { useContext } from 'react';
import './App.css';
import {ThemeProvider} from '@mui/material';
import Routes from './Routes';
import { darkTheme, lightTheme, ThemeContext } from './components/theme-context';



function App() 
{
  const {colorTheme} =  useContext(ThemeContext); // Dit is De content Provider Voor DarkMode en LightMode
  return (
    <ThemeProvider theme={colorTheme === "light" ? lightTheme : darkTheme}> 
    {/* Dit is de Content Provider voor de DarkMode LightMode */}

      <div id="out" className="App red background">    {/*Dit is onze Background dit 
                                                          is dat alles wordt onthouden 
                                                          als je van pagine switcht */}
        <Routes /> {/* Dit is de WebRoutes zoals /Chat of /Login  dit staat in ./Routes.tsx  */}
      </div>    
    </ThemeProvider>
  );
}
export default App;

