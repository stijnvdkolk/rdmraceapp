import * as React from 'react';
import Button from '@mui/material/Button';
import IProps from '../IProps';

interface buttonProps extends IProps {
    url?: string;
    text?: string;
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
                    onClick={() => Pressed(url)}
                >
                    {text}
                </Button>
            </div>
        );
}