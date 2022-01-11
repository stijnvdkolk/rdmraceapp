import * as React from "react";
import Button from "@mui/material/Button";
import IProps from "../IProps";
import { useHistory } from "react-router-dom";

interface buttonProps extends IProps {
  url?: string;
  text?: string;
}

// makes a button. needs a url, button text, and also needs to be styled to fit mock-ups
export default function Buttoned(props: buttonProps){
    const { url, text, style } = props;
    function Pressed(url: string | undefined) {
        if (url !== undefined) {
            window.location.href = url;
        }
    }
        return(
            <div 
                className="but"
            >
                <Button 
                    variant="contained" 
                    style={ style }
                    onClick={() => Pressed(url)}
                >
                    {text}
                </Button>
            </div>
        );
}
