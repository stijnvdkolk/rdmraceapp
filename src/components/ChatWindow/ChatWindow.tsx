import { Card } from "@mui/material";
import * as react from 'react';
import { useParams } from "react-router-dom";
import IProps from "../IProps";
import "./ChatWindow.css";

export default function ChatWindow(props: IProps){
    const { name, children, imageLink } = props;
    let  {channelID}  = useParams<{channelID : string}>();
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    react.useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, []);
    console.log(channelID);
    

    const chatHeaderContainer = ( //we just put all children in a div over here so we don't have to worry about mismatches
        <div className="chatContainer">
            <div className="channelHeader">
                <img className="Iprofile profile" width="75" alt="" src={imageLink}/>
                <label className="Iproduct product">{name}</label>
            </div>
            
            <div className="channelTrailing static">

            </div>
        </div>
    );

    return (
        <div className="a100">
            { matches && (
            <div className="Content Wide">
            
            <Card
            style={{
                width: "95%",
                height: "90vh",
                borderRadius: "16px",
                background: "linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE",
            }}
            >
                {chatHeaderContainer}
                {children}
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
                        {chatHeaderContainer}
                        {children}
                    </Card>      
            </div>  
            )}
            
        </div>
        
    );
}