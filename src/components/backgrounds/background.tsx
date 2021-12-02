import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import React from 'react';
import IProps from '../IProps';
import './background.css';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { createTheme, useTheme } from '@mui/material';

class BackgroundProps implements IProps {
    className?: string = "out";
}
const defaultTheme = createTheme({
    palette: {
      mode: "light",
    }
  });

  

export default function Background(props : BackgroundProps){
    const [darkMode, setDarkMode] = React.useState(false);
    const [theme, setTheme] = React.useState(defaultTheme);
    const onClick = () => {

        const isDarkTheme = theme.palette.mode === "dark";
        console.log(isDarkTheme);
        setTheme(
        createTheme({
            palette: {
              mode: isDarkTheme ? 'light' : 'dark'
    
            },
          }),
        );
    }
    function backgroundChange(){        
        let navdraw = document.getElementById("out");
            if (navdraw?.classList?.contains("red")) {
                navdraw?.classList?.add("dark");
                navdraw?.classList?.remove("red");
                setDarkMode(true);
            }
            else {
                navdraw?.classList?.add("red");
                navdraw?.classList?.remove("dark");
                setDarkMode(false);
            }
    }
    
    return(
        <div className={props.className} onClick={onClick}>
            {darkMode ?
            <WbSunnyOutlinedIcon sx={
                            style => ({
                                width: "30px",
                                height: "30px",
                            })
                        }/>
            : 
            <DarkModeOutlinedIcon sx={
                            style => ({
                                width: "30px",
                                height: "30px",
                            })
                        }/>
            }
        </div>
    );
}