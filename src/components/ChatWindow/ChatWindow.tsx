import { Card, Divider, TextField } from "@mui/material";
import * as react from 'react';
//import { useParams } from "react-router-dom";
import IProps from "../IProps";
import "./ChatWindow.css";

export default function ChatWindow(props: IProps){
    const { name, children, imageLink } = props;
    //let  {channelID}  = useParams<{channelID : string}>();
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    react.useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, []);
    

    const chatHeaderContainer = ( //we just put all children in a div over here so we don't have to worry about mismatches
        <div className="chatHeaderContainer">
            <div className="channelHeader">
                <img className="Iprofile profile" width="75" alt="" src={imageLink}/>
                <label className="Iproduct productChat">{name}</label>
            </div>
            
            <div className="channelTrailing static">

            </div>
        </div>
    );
    const SendForm = (
        <div className="sendForm">
            <div className="sendFormContainer">
                <div className="sendFormInner">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" className="MessageInput"/>
                </div>
            </div>
        </div>
    )

    return ( //refactored this to just 1 expression easier to read          
        <div className={matches ? "Content Wide" : "Content Narrow"}>            
            <Card style={{
                    width: matches ? "95%" : "90%",
                    height: matches ? "90vh" : "100%",
                    borderRadius: "16px",
                }}>
                {chatHeaderContainer}
                <Divider/>                
                {children /* this is where the chat messages go */}
                {SendForm /*this is the send input*/}
            </Card>
        </div> 
    );
}