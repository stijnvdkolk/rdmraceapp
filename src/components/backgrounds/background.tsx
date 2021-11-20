import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react';
import IProps from '../IProps';
import './background.css';

class BackgroundProps implements IProps {
    className?: string = "out";
}
export default function Background(props : BackgroundProps){
    function backgroundChange(){
        let navdraw = document.getElementById("out");
            if (navdraw?.classList?.contains("red")) {
                navdraw?.classList?.add("dark");
                navdraw?.classList?.remove("red");
            }
            else {
                navdraw?.classList?.add("red");
                navdraw?.classList?.remove("dark");
            }
    }
    
    return(
        <div className={props.className} onClick={backgroundChange}>
            <DarkModeIcon/>
        </div>
    );
}