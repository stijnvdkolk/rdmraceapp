import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import React, { useContext } from "react";
import IProps from "../IProps";
import "./background.css";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { ThemeContext } from "../theme-context";
import { IconButton } from "@mui/material";

class BackgroundProps implements IProps {
  className?: string = "out";
}

// function to change the background from dark to red mode and back
export default function Background(props: BackgroundProps) {
  const { changeColorTheme, colorTheme } = useContext(ThemeContext);

  function backgroundChange() {
    let bg = document.getElementById("out");
    if (bg?.classList?.contains("red")) {
      bg?.classList?.add("dark");
      bg?.classList?.remove("red");
      if (changeColorTheme != null) {        
        changeColorTheme();
      }
      localStorage.setItem("theme", "dark");
    } else {
      bg?.classList?.add("red");
      bg?.classList?.remove("dark");
      if (changeColorTheme != null) {        
        changeColorTheme();
      }
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <IconButton className={props.className} onClick={backgroundChange}>
      {!(colorTheme === "light") ? (
        <WbSunnyOutlinedIcon
          color="secondary"
          sx={(style) => ({
            width: "25px",
            height: "25px",
          })}
        />
      ) : (
        <DarkModeOutlinedIcon
          color="secondary"
        sx={(style) => ({
          width: "25px",
          height: "25px",
        })}
        />
      )}
    </IconButton>
  );
}
