import { Avatar, Card, Divider, FormControl, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
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
import { ConsumeEffect } from "../../API/ApiCalls";
import { useParams } from "react-router-dom";
import { SaveAltOutlined, ThumbUpOutlined } from "@mui/icons-material";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';


function FkDateTime(date: Date) {
    var dtm: Date	= new Date(date);
    var retVal: string = `${dtm.getDate()}/${dtm.getMonth() + 1}/${dtm.getFullYear()} ${dtm.getHours()}:${dtm.getMinutes()}:${dtm.getSeconds()}`;
    return retVal;
}
interface UParams {
    channelID: string | undefined;
}

export default function ChatWindow(props: IProps){
    const { colorTheme } =  useContext(ThemeContext);
    const { name, imageLink } = props;
    const { channelID } = useParams<UParams>();
    //#region MediaQuery
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, [setMatches]);
    //#endregion

    //#region Context Menu Bad Code
    //TODO Refactor
    const [contextMenu, setContextMenu] = react.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    
      const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
          contextMenu === null
            ? {
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
              }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
              // Other native context menus might behave different.
              // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
              null,
        );
      };

    const handleClose = () => {
        setContextMenu(null);
    };


    const [ImageContext, setImageContext] = react.useState<{
        mouseX: number;
        mouseY: number;
      } | null>(null);
    
      const handleImageContext = (event: React.MouseEvent) => {
        event.preventDefault();
        
        setImageContext(
          ImageContext === null
            ? {
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
              }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
              // Other native context menus might behave different.
              // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
              null,
        );
        
      };

    const CloseImageContext = () => {
        
        setImageContext(null);
    };

    //TODO: REFACTOR THIS CODE
    //TODO: Voeg PFP Click
    const [ProfilePictureContext, SetProfilePictureContext] = react.useState<{
        mouseX: number;
        mouseY: number;
      } | null>(null);
    
      const handleProfilePictureContext = (event: React.MouseEvent) => {
        event.preventDefault();
        
        SetProfilePictureContext(
          ProfilePictureContext === null
            ? {
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
              }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
              // Other native context menus might behave different.
              // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
              null,
        );
        
      };

    const CloseProfilePictureContext = () => {
        SetProfilePictureContext(null);
    };
    //#endregion

    //#region MessageLoader
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = react.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isMessageLoaded, setIsMessageLoaded] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[] | undefined>(undefined); //Message
    useEffect(() => {       //bruh?
       ConsumeEffect(setIsMessageLoaded, setMessages, () => {return getMessages(channelID!);} );
    }, [channelID, name, setError]);
    //#endregion
    //#region Message
    const conversation = (
        <div className="conversation">
            {messages !== undefined && messages.length !== 0 ? (
                messages.map((berichten, index) => ( 
                    <>               
                <div key={index} 
                    className={colorTheme  === "dark" ? "messageParent darkmessage" : "messageParent lightmessage"} 
                    >                    

                    <div className={"message"}> 
                        <div className="message-text" 
                            onContextMenu={handleContextMenu} 
                            style={{cursor: "context-menu"}}>
                            {berichten.content}
                        </div>
                        <div className="message-info"
                           onContextMenu={handleContextMenu} 
                           style={{cursor: "context-menu"}}>
                            <div className="message-time">
                                { FkDateTime(berichten.createdAt as Date) } 
                            </div>
                            <div className="message-sender">
                                {berichten?.author?.username}
                            </div>
                        </div>
                        <div className="message-image"
                            onContextMenu={handleProfilePictureContext}
                            style={{cursor: "context-menu"}}>
                        
                            <Avatar src={"https://cdn.rdmraceapp.nl" + berichten?.author?.profilePicture} alt="" sx={{
                                width: "50px",
                                height: "50px",
                            }}
                                />
                            <Menu
                                open={ProfilePictureContext !== null}
                                onClose={CloseProfilePictureContext}
                                anchorReference="anchorPosition"
                                anchorPosition={
                                    ProfilePictureContext !== null ?
                                    {top: ProfilePictureContext!.mouseY, left: ProfilePictureContext!.mouseX} :
                                    undefined
                                }>
                                <MenuItem onClick={CloseProfilePictureContext}>
                                    <div className="MenuItemWithIcon">
                                        <AttachFileIcon/>
                                        {"Copy Image"}
                                    </div>                                            
                                </MenuItem>
                                <MenuItem onClick={CloseProfilePictureContext}>
                                    <div className="MenuItemWithIcon">
                                        <SaveAltOutlined/>
                                        {"Save Image"}
                                    </div>                                            
                                </MenuItem>                                
                            </Menu>
                        </div>
                        {berichten.attachments && berichten.attachments.map((attachment, index) => (
                                <div key={index} className={`message-image-content`} 
                                    style={{gridRow: index+4, cursor: "context-menu"}}
                                    onContextMenu={handleImageContext}>
                                    <img src={`https://cdn.rdmraceapp.nl/attachments/${channelID}/${berichten.id}/${attachment.name}`} width={200} alt="" className="Picture" />
                                    <Menu
                                        open={ImageContext !== null}
                                        onClose={CloseImageContext}
                                        anchorReference="anchorPosition"
                                        anchorPosition={
                                            ImageContext !== null ?
                                            {top: ImageContext!.mouseY, left: ImageContext!.mouseX} :
                                            undefined
                                        }>
                                        <MenuItem onClick={CloseImageContext}>
                                            <div className="MenuItemWithIcon">
                                                <AttachFileIcon/>
                                                {"Copy Image"}
                                            </div>                                            
                                        </MenuItem>
                                        <MenuItem onClick={CloseImageContext}>
                                            <div className="MenuItemWithIcon">
                                                <SaveAltOutlined/>
                                                {"Save Image"}
                                            </div>                                            
                                        </MenuItem>
                                        <MenuItem onClick={CloseImageContext}> {/*TODO: Copy to clipboard*/}
                                            <div className="MenuItemWithIcon">
                                                <PersonOutlinedIcon/>
                                                {"Author Profile"}
                                            </div>                                            
                                        </MenuItem>
                                        <MenuItem onClick={CloseImageContext}> 
                                            <div className="MenuItemWithIcon">
                                                <ThumbUpOutlined/>
                                                {"Nice Embed Bro"}
                                            </div>                                            
                                        </MenuItem>
                                    </Menu>
                                </div>
                        ))}
                        
                    </div>
                </div>
                <Menu
                    id="TextMenu"
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null ?
                        {top: contextMenu!.mouseY, left: contextMenu!.mouseX} :
                        undefined
                    }
                    >
                    <MenuItem onClick={handleClose}> {/*TODO: Copy to clipboard*/}
                        <div className="MenuItemWithIcon">
                            <AttachFileIcon/>
                            {"Copy Text"}
                        </div>                                            
                    </MenuItem>
                    <MenuItem onClick={handleClose}> 
                        <div className="MenuItemWithIcon">
                            <PersonOutlinedIcon/>
                            {"Author Profile"}
                        </div>                                            
                    </MenuItem>                    
                </Menu>
                </>
            ))):(<></>)} {/* Bruh */}
            {messages !== undefined && messages!.length === 0 && (
                <div className={colorTheme  === "dark" ? "messageParent darkmessage" : "messageParent lightmessage"} >
                    <div className={"message"}> 
                        <div className="message-text">
                            {"This looks Empty, Be the first to send a message!"}
                        </div>
                    </div>
                </div>
                
            
            )}
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
                    {/* TODO: Outline Color theme color in Both modes */}
                    <FormControl className="MessageInput">
                        <TextField 
                            id="outlined-basic" 
                            label="Send Message" 
                            variant="outlined" 
                            className="MessageInput2" 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmojiEmotionsOutlinedIcon className="Emoji"/>
                                    </InputAdornment>
                                ),
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <div className="animatedAttachment11">
                                            <AttachFileIcon className="animatedAttachment"/>
                                        </div>
                                        <div>
                                            <ArrowForwardIcon className="animatedSend"/>
                                        </div>
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
                    gridTemplateRows: "72px 2px auto 1px 72px ",
                }} >
                {chatHeaderContainer}
                <Divider style={{gridRow: 2}} />                
                {conversation  /* this is where the chat messages go */}
                {SendForm /*this is the send input*/}
                
            </Card>
        </div> 
    );
    //#endregion
}