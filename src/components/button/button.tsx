import * as React from 'react';
import Button from '@mui/material/Button';
import { CssBaselineProps } from '@mui/material';
import { style } from '@mui/system';

type buttonProps = {
    url?: string;
    text?: string;
    style?: React.CSSProperties;
};

export default function Buttoned(props: buttonProps){
    const { url, text, style } = props;
    function Pressed(url: string | URL | undefined) {
        window.open(url, "_self");
    }
        return(
            <div 
                className="but"
            >
                <Button 
                    variant="contained" 
                    style={ style }
                    onClick={() => Pressed(props.url)}
                >
                    {props.text}
                </Button>
            </div>
        );
}