import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react';
import './background.css';

// background images won't work yet, might have to do with the card placement.
export default function Background(){
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
        <div className="out" onClick={backgroundChange}>
            <DarkModeIcon/>
        </div>
    );
}