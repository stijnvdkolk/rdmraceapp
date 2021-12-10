import { Avatar, Card, Divider, FormControl, InputAdornment, TextField } from "@mui/material";
import * as react from 'react';
import { useContext, useEffect, useState } from "react";
import { getMessages } from "../../API/Chat";
import Message from "../../classes/Message";
//import { useParams } from "react-router-dom";
import IProps from "../IProps";
import { ThemeContext } from "../theme-context";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./ChatWindow.css";

function FkDateTime(date: Date) {
    var dtm: Date	= new Date(date);
    var retVal: string = `${dtm.getDate()}/${dtm.getMonth() + 1}/${dtm.getFullYear()} ${dtm.getHours()}:${dtm.getMinutes()}:${dtm.getSeconds()}`;
    return retVal;
}

export default function ChatWindow(props: IProps){
    const { colorTheme } =  useContext(ThemeContext);
    const { name, imageLink } = props;
    //#region MediaQuery
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, [setMatches]);
    //#endregion
    //#region MessageLoader
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = react.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isMessageLoaded, setIsMessageLoaded] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[] | undefined>(undefined); //Message
    useEffect(() => {       
        getMessages(20)
        .then(
            (result) => {
                setIsMessageLoaded(true);
                setMessages(result);
            },
            (error) => {
                setIsMessageLoaded(true);
                setError(error);
            }
        )
        
    }, [name, setError]);
    //#endregion
    //#region Message
    const conversation = (
        <div className="conversation">
            {messages && messages.map((berichten, index) => (
                
                <div key={index} className={colorTheme  === "dark" ? "messageParent darkmessage" : "messageParent lightmessage"} >
                    <div className={"message"}> 
                        <div className="message-text">
                            {berichten.content}
                        </div>
                        <div className="message-info">
                            <div className="message-time">
                                { FkDateTime(berichten.createdAt as Date) } 
                            </div>
                            <div className="message-sender">
                                {berichten?.author?.name}
                            </div>
                        </div>
                        <div className="message-image">
                            <Avatar src={berichten?.author?.profilePicture} alt="" sx={{
                                width: "50px",
                                height: "50px",
                            }}
                                />
                        </div>
                        {berichten.attachments && berichten.attachments.map((attachment, index) => (
                            <div key={index} className={`message-image-content`} style={{gridRow: index+4}}>
                                <img src={attachment.toString()} width={200} alt="" className="Picture" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {/* <div className="message">
                <div className="message-text">
                    {messages && messages.content}
                </div>
                <div className="message-time">
                    {messages && messages.createdAt}
                </div>
            </div> */}
        </div>
    );
    //#endregion  
    //#region WindowHeader
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
    //#endregion
    //#region messageInput
    const SendForm = (
        <div className="sendForm">
            <div className="sendFormContainer">
                <div className="sendFormInner">
                    <Divider sx={{
                        marginBottom: "10px",
                    }}/>
                    <FormControl className="MessageInput">
                        <TextField 
                            id="outlined-basic" 
                            label="Send Message" 
                            variant="outlined" 
                            className="MessageInput2" 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmojiEmotionsOutlinedIcon/>
                                    </InputAdornment>
                                ),
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <AttachFileIcon/>
                                        <ArrowForwardIcon/>
                                    </InputAdornment>
                                )
                            }}
                        
                        />
                    </FormControl>
                </div>
            </div>
        </div>
    );
    //#endregion
    //#region RETURN
    return ( //refactored this to just 1 expression easier to read          
        <div className={matches ? "Content Wide" : "Content Narrow"}>            
            <Card style={{
                    width: matches ? "95%" : "90%",
                    height: matches ? "90vh" : "100%",
                    borderRadius: "16px",
                    display: "grid",
                    gridTemplateColumns: "auto",
                    gridTemplateRows: "72px 2px auto 10vh",
                }} >
                {chatHeaderContainer}
                <Divider style={{gridRow: 2}} />                
                {conversation /* this is where the chat messages go */}
                {SendForm /*this is the send input*/}
            </Card>
        </div> 
    );
    //#endregion
}