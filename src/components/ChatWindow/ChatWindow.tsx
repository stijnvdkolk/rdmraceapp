import { Card } from "@mui/material";
import React, * as react from 'react';
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import IProps from "../IProps";
import NavDrawer from "../navdrawer/navdrawer";
import "./ChatWindow";

export default function ChatWindow(props: IProps){
    const { name, children, imageLink } = props;
    let  {channelID}  = useParams<{channelID : string}>();
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    react.useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, []);
    console.log(channelID);
    
    return (
        <div className="a100">
            { matches && (
            <div className="Content Wide">
            
            <Card
            style={{
                width: "80em",
                height: "90vh",
            }}
            >
                <h1>Chat Window</h1>
            </Card>
            </div>
            )}
            
            { !matches && (  
                <div className="Content Narrow">          
                    <Card
                    style={{
                    width: "90%",
                    height: "90%",
                    }}
                    >
                        <h1>Chat Window</h1>
                    </Card>      
            </div>  
            )}
            
        </div>
        
    );
}