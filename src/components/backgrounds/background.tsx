import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react';
import IProps from '../IProps';
import './background.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


class BackgroundProps implements IProps {
    className?: string = "out";
}
export default function Background(props : BackgroundProps){
    const [darkMode, setDarkMode] = React.useState(true);

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
        <div className={props.className} onClick={backgroundChange}>
            {darkMode ?
            <WbSunnyIcon color='secondary' sx={
                            style => ({
                                width: "30px",
                                height: "30px",
                            })
                        }/>
            : 
            <DarkModeIcon sx={
                            style => ({
                                width: "30px",
                                height: "30px",
                            })
                        }/>
            }
        </div>
    );
}