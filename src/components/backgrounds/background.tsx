import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import React, { useContext } from 'react';
import IProps from '../IProps';
import './background.css';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { ThemeContext } from "../theme-context";

class BackgroundProps implements IProps {
    className?: string = "out";
}

// function to change the background from dark to red mode and back
export default function Background(props : BackgroundProps){
    const { changeColorTheme, colorTheme } =  useContext(ThemeContext);
    
    function backgroundChange(){        
        let bg = document.getElementById("out");
            if (bg?.classList?.contains("red")) {
                bg?.classList?.add("dark");
                bg?.classList?.remove("red");
                if (changeColorTheme != null) {
                    changeColorTheme();
                }
            }
            else {
                bg?.classList?.add("red");
                bg?.classList?.remove("dark");
                if (changeColorTheme != null) {
                    changeColorTheme();
                }
            }
    }
    
    return(
        <div className={props.className} onClick={backgroundChange}>
            {!(colorTheme === 'light') ? (
                <WbSunnyOutlinedIcon sx={
                    style => ({
                        width: "30px",
                        height: "30px",                        
                        color: "red",
                    })
                }/>
            ) : (
                <DarkModeOutlinedIcon sx={
                    style => ({
                        width: "30px",
                        height: "30px",
                    })
                }/>
            )}
        </div>
    );
}