/* eslint-disable jsx-a11y/anchor-has-content */
import { Avatar, Card, Divider, FormControl, IconButton, InputAdornment, Menu, MenuItem, Popover, TextField } from "@mui/material";
import React, * as react from 'react';
import { useContext, useEffect, useState } from "react";
import { deleteMessage, getMessages, MakeDM, SendMessage } from "../../API/Chat";
import Message from "../../classes/Message";
//import { useParams } from "react-router-dom";
import IProps from "../IProps";
import { ThemeContext } from "../theme-context";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./ChatWindow.css";
import { ConsumeEffect } from "../../API/ApiCalls";
import { useHistory, useParams } from "react-router-dom";
import { SaveAltOutlined, ThumbUpOutlined } from "@mui/icons-material";
import Pfp, { tryAttachment } from "../../classes/profilePicture";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import UserProfile from "../userProfile/userProfile";
import Picker, { IEmojiData } from 'emoji-picker-react';


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
    let history = useHistory();
    //#region MediaQuery
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, [setMatches]);
    //#endregion
    const [channelNumber, setChannelNumber] = useState(channelID);
    const [profileOn, setProfileOn] = useState(null);
    const handleProfileClick = (event: any) => {
        setProfileOn(event.currentTarget);
    };    
    const GetProfile = (event : any) => {
        setLastClickedPersonAttchment(event.currentTarget);
        handleProfileClick(event);
    }

      const handleProfileClose = () => {
        setProfileOn(null);
      };
    const profileOpen = Boolean(profileOn);
    const profileId = profileOpen ? 'simple-popover' : undefined;

    const [lastMessage, setLastMessage] = useState<Message[] | undefined>(undefined);


    const [emojiOn, setemojiOn] = useState(null);
    const handleemojiClick = (event: any) => {
        setemojiOn(event.currentTarget);
      };
    
    const Getemoji = (event : any) => {
        handleemojiClick(event);
    }

    const handleemojiClose = () => {
        setemojiOn(null);
      };
    const emojiOpen = Boolean(emojiOn);
    const emojiId = emojiOpen ? 'simple-popover' : undefined;

    // const [PopOverImageOn, setPopOverImageOn] = useState(null);
    // const handlePopOverImageClick = (event: any) => {
    //     setPopOverImageOn(event.currentTarget);
    //   };
    
    // const GetPopOverImage = (event : any) => {
    //     handlePopOverImageClick(event);
    // }

    // const handlePopOverImageClose = () => {
    //     setPopOverImageOn(null);
    //   };
    // const PopOverImageOpen = Boolean(PopOverImageOn);
    // const PopOverImageId = PopOverImageOpen ? 'simple-popover' : undefined;


    useEffect(() => {
        setChannelNumber(channelID);
        setMessages(undefined);
    }, [channelID]);
    //#region Message
        //#region Context Menu Bad Code
            //TODO Refactor
        const [contextMenu, setContextMenu] = react.useState<{
            mouseX: number;
            mouseY: number;
        } | null>(null);
        
        const handleContextMenu = (event: React.MouseEvent) => {
            event.preventDefault();
            setLastClickedPerson(event.target);
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
        //
        const handleClose = () => {
            setContextMenu(null);
        };
        const [LastClickedPerson, setLastCLickedPerson] = useState<string | undefined>(undefined);
        const [LastClicked, setLastCLicked] = useState<string | undefined>(undefined);
        const [ImageContext, setImageContext] = react.useState<{
            mouseX: number;
            mouseY: number;
        } | null>(null);
        
        const handleImageContext = (event: React.MouseEvent) => {
            event.preventDefault();
            setlastclickedImage(event.target);
            setLastClickedPersonAttchment(event.target);
            //console.log((event.target as HTMLImageElement).src === undefined ? ((event.target as HTMLDivElement).firstChild as HTMLImageElement).src === undefined ? "" : (((event.target as HTMLDivElement).firstChild as HTMLImageElement).src)   : (event.target as HTMLImageElement).src);
            //typeof(event.target) == HTMLDivElement ? setLastCLicked(event.target as HTMLDivElement) : setLastCLicked(undefined);
            setImageContext(
            ImageContext === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : null,
            );            
        };
        



        const CloseImageContext = () => {            
            setImageContext(null);
        };

        const [ProfilePictureContext, SetProfilePictureContext] = react.useState<{
            mouseX: number;
            mouseY: number;
        } | null>(null);
        
        function handleProfilePictureContext(event: React.MouseEvent) {
            event.preventDefault();
            setlastclickedImage(event.target);
            setLastClickedPerson(event.target);
            SetProfilePictureContext(
                ProfilePictureContext === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu


                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null
        );

    }

        const CloseProfilePictureContext = () => {
            SetProfilePictureContext(null);
        };
        //#region Context Menu Functions

        function toDataURL(url : string) {
            return fetch(url).then((response) => {
                    return response.blob();
                }).then(blob => {
                    return URL.createObjectURL(blob);
                });
        }
        // function ToBlob(url : string) {
        //     return fetch(url).then((response) => {
        //             return response.blob();
        //         });
        // }
        // function ToCopyImage() {
        // }

        async function MakeDmAndGo(){
            if(LastClickedPerson){
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                await MakeDM(LastClickedPerson).then(
                    (res) => {
                        handleClose();
                        CloseProfilePictureContext();
                        history.push(`/chat/${res.id!}`);
                    }
                );
            }
        }

        const [messageClicked, setmessageClicked] = useState<string | undefined>(undefined);

        //TODO: Copy image to clipboard
        function setlastclickedImage(e : EventTarget){
            if ((e as HTMLImageElement).src === undefined){
                if((e as HTMLDivElement).firstChild !== null){
                    if(((e as HTMLDivElement).firstChild as HTMLImageElement).src !== undefined){
                        setLastCLicked(((e as HTMLDivElement).firstChild as HTMLImageElement).src);
                    }
                }
            }
            else{
                setLastCLicked((e as HTMLImageElement).src);
            }            
        }
        function findLastPersonClicked(id: string ){
            setLastCLickedPerson(messages?.find(x => x.id === id)?.author?.id);
            setmessageClicked(messages?.find(x => x.id === id)?.id);            
        }

        function DeleteMessage(close: Function){
            if(messageClicked){
                deleteMessage(channelID!, messageClicked);
                close();
                setReload(false);
                setReload(true);
                
            }
        }

        function setLastClickedPersonAttchment(e : EventTarget){
            // console.log(e);
            // console.log( (e as HTMLImageElement).parentElement as HTMLDivElement);
            if ((e as HTMLImageElement).src !== "" && (e as HTMLImageElement).src && (e as HTMLImageElement).src.length > 1 ){
                var temp : HTMLDivElement = (e as HTMLDivElement).parentElement as HTMLDivElement;
                while((temp.parentElement as HTMLDivElement).id !== "" && (temp.parentElement as HTMLDivElement).id.length > 1){
                    temp = (temp).parentElement as HTMLDivElement;
                }
                findLastPersonClicked(temp.id);             
            }
            else{
                //TODO: Add a check for the first child of the div
                findLastPersonClicked((e as HTMLDivElement).parentElement?.id!);
            }
        }
        function setLastClickedPerson(e: EventTarget){
            if ((e as HTMLImageElement).src !== "" && (e as HTMLImageElement).src && (e as HTMLImageElement).src.length > 1 ){
                findLastPersonClicked((e as HTMLImageElement).parentElement?.parentElement?.parentElement?.id!);
            }
            else if((e as HTMLDivElement)){
                var temp : HTMLDivElement = (e as HTMLDivElement).parentElement as HTMLDivElement;
                while((temp.parentElement as HTMLDivElement).id !== "" && (temp.parentElement as HTMLDivElement).id.length > 1){
                    temp = (temp).parentElement as HTMLDivElement;
                }
                findLastPersonClicked(temp.id);
            }
        }

        async function download() {
            const a = document.createElement("a");
            a.href = await toDataURL(LastClicked!);
            a.download = "image.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        const downloadImage = (close: Function) =>{
            LastClicked !== undefined ? download() : fill();
            close();
        }
        //Filler test Functie
        function fill(){
            //empty is voor als er geen Image in buffer staat
        }
        //#endregion


        //#endregion
     //#region MessageLoader
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = react.useState(false);
    const [reload, setReload] = react.useState(false);
    const [scroll2Bottom, setScroll2Bottom] = react.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isMessageLoaded, setIsMessageLoaded] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[] | undefined>(undefined); //Message
    useEffect(() => {
        setLastMessage(messages);
        ConsumeEffect(setIsMessageLoaded, setMessages, () => {return getMessages(channelID!);} );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelID, reload]);

    useEffect(() => {
        if (messages !== undefined && messages.length !== lastMessage?.length) {
            setScroll2Bottom(!scroll2Bottom);
        }
        else if (lastMessage === undefined) {
            setTimeout(() => {
                setScroll2Bottom(!scroll2Bottom);
            }, 1000);             
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, lastMessage]);
    //#endregion
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [conv, setConv] = useState<JSX.Element | undefined>(undefined);
    const conversation = ( // onScroll={() => scrollyBoy }
        <div className="conversation"  > 
            {isMessageLoaded ? (
                messages !== undefined && messages.length !== 0 ? (
                    <>
                        {messages.map((berichten, index) => {                        
                            return (
                                <div key={berichten.id}>
                                    <div 
                                        className={colorTheme === "dark" ? "messageParent darkmessage" : "messageParent lightmessage"}
                                    >
                                        <div className={"message"} id={berichten.id}>
                                            <div className="message-text"
                                                onContextMenu={handleContextMenu}
                                                style={{ cursor: "context-menu" }}>
                                                {berichten.content}
                                            </div>
                                            <div className="message-info"
                                                onContextMenu={handleContextMenu}
                                                style={{ cursor: "context-menu" }}>
                                                <div className="message-time">
                                                    {FkDateTime(berichten.createdAt as Date)}
                                                </div>
                                                <div className="message-sender">
                                                    <b>{berichten?.author?.username}</b>
                                                </div>
                                            </div>
                                            
                                            <div className="message-image"
                                                onContextMenu={handleProfilePictureContext}
                                                style={{ cursor: "context-menu" }}
                                                onClick={GetProfile}
                                                >

                                                <Avatar src={Pfp(berichten.author?.id!, berichten.author?.profilePicture!)} alt="" sx={{
                                                    width: "50px",
                                                    height: "50px",
                                                }} />
                                                
                                            </div>
                                            {berichten.attachments && berichten.attachments.map((attachment, index) => (
                                                <div key={index} className={`message-image-content`}
                                                    style={{ gridRow: index + 4, cursor: "context-menu" }}
                                                    onContextMenu={handleImageContext}>
                                                        <img src={tryAttachment(channelNumber!, berichten!.id!, attachment!.name!)} 
                                                        width={200} alt="" className="Picture" />
                                                    
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                    
                                </div>
                            );
                        
                        })}
                        <Menu
                            id="TextMenu"
                            open={contextMenu !== null}
                            onClose={handleClose}
                            anchorReference="anchorPosition"
                            anchorPosition={contextMenu !== null ?
                                { top: contextMenu!.mouseY, left: contextMenu!.mouseX } :
                                undefined}>
                            <MenuItem onClick={handleClose}> {/*TODO: Copy to clipboard*/}
                                <div className="MenuItemWithIcon">
                                    <AttachFileIcon color="primary" />
                                    {"Copy Text"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={MakeDmAndGo}>
                                <div className="MenuItemWithIcon">
                                    <SendIcon color="primary" />
                                    {"Start Direct Message"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => DeleteMessage(handleClose)}>
                                <div className="MenuItemWithIcon">
                                    <DeleteOutlineOutlinedIcon  color="primary"/>
                                    {"Delete Message"}
                                </div>
                            </MenuItem>
                        </Menu>
                        <Menu                                                
                            open={ProfilePictureContext !== null}
                            onClose={CloseProfilePictureContext}
                            anchorReference="anchorPosition"
                            anchorPosition={ProfilePictureContext !== null ?
                                { top: ProfilePictureContext!.mouseY, left: ProfilePictureContext!.mouseX } :
                                undefined}>
                            <MenuItem onClick={CloseProfilePictureContext}>
                                <div className="MenuItemWithIcon">
                                    <AttachFileIcon  color="primary"/>
                                    {"Copy Image"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => downloadImage(CloseProfilePictureContext)}>
                                <div className="MenuItemWithIcon">
                                    <SaveAltOutlined  color="primary"/>
                                    {"Save Image"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => DeleteMessage(CloseProfilePictureContext)}>
                                <div className="MenuItemWithIcon">
                                    <DeleteOutlineOutlinedIcon  color="primary"/>
                                    {"Delete Message"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={MakeDmAndGo}>
                                <div className="MenuItemWithIcon">
                                    <SendIcon color="primary" />
                                    {"Start Direct Message"}
                                </div>
                            </MenuItem>
                        </Menu>
                        <Menu
                            open={ImageContext !== null}
                            onClose={CloseImageContext}
                            anchorReference="anchorPosition"
                            anchorPosition={ImageContext !== null ?
                                { top: ImageContext!.mouseY, left: ImageContext!.mouseX } :
                                undefined}>
                            <MenuItem onClick={()=>fill() /*TODO: FIX */}>
                                <div className="MenuItemWithIcon">
                                    <AttachFileIcon  color="primary"/>
                                    {"Copy Image"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => downloadImage(CloseImageContext)}>
                                <div className="MenuItemWithIcon Debug2">
                                    <SaveAltOutlined color="primary" />
                                    {"Save Image"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={CloseImageContext}>
                                <div className="MenuItemWithIcon">
                                    <ThumbUpOutlined  color="primary"/>
                                    {"Nice Embed Bro"}
                                </div>
                            </MenuItem>
                            <MenuItem onClick={() => DeleteMessage(CloseImageContext)}>
                                <div className="MenuItemWithIcon">
                                    <DeleteOutlineOutlinedIcon color="primary" />
                                    {"Delete Message"}
                                </div>
                            </MenuItem>
                        </Menu>
                        <Popover 
                            id={profileId}
                            open={profileOpen}
                            anchorEl={profileOn}
                            onClose={handleProfileClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            >
                            <UserProfile bigprofile={false} functieArg={LastClickedPerson!} self={false} />
                        </Popover>
                    </>
                )                
                :
                messages !== undefined && messages!.length === 0 && (
                    <div className={colorTheme  === "dark" ? "messageParent darkmessage" : "messageParent lightmessage"} >
                        <div className={"message"}> 
                            <div className="message-text">
                                {"This looks Empty, Be the first to send a message!"}
                            </div>
                        </div>
                    </div>
                    
                
                )
            ) : (
                <div></div>)}
            <div id="scroll-to-bottom" />
        </div>
    );
    useEffect(() => {
        setTimeout(() => {
            setReload(!reload); 
        }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);
    useEffect(() => {
        if (messages !== undefined) {
            setConv(conversation);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, channelID]);
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
    const [input, setInput] = useState("");
    
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function SendMessageFromInput(){
        if (input !== "") {
            //Begin van message Input
            var formData = new FormData();
            var files = document?.getElementById('fileInput') as HTMLInputElement;
            if (files && files.files && files.files.length > 0 ) {
                for (var i = 0; i < files.files.length; i++) {
                    formData.append("files", files.files[i]);
                }
            }
            formData.append("content", input);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var msg : Message = (await SendMessage(channelID!, formData)).message;
            setInput("");       //bruh?
            (document?.getElementById('fileInput') as HTMLInputElement).value = "";
            setReload(!reload);

        }
    }
    useEffect(() => {
        if (document.getElementById("scroll-to-bottom") !== null) {
            document.getElementById("scroll-to-bottom")!.scrollIntoView();
        }
    }, [scroll2Bottom]);
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            SendMessageFromInput();
        }
    }
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);

    const onEmojiClick = (event: any, emojiObject: any) => {
        setChosenEmoji(emojiObject);
    };
    useEffect(() => {
        if (chosenEmoji !== null) {
            console.log(chosenEmoji);
            setInput(input + chosenEmoji.emoji);
            setChosenEmoji(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenEmoji]);

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
                            value={input}
                             onChange={(e) => setInput(e.target.value)}
                             onKeyDown={onKeyDown}
                             InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                      <div style={{ cursor: "pointer",}} onClick={Getemoji}>
                                        <EmojiEmotionsOutlinedIcon color="primary" className="animatedAttachment" onClick={Getemoji}/>   
                                      </div>                                 
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <>
                                      <input //CrackHead Html
                                        id="fileInput"
                                        type="file"
                                        style={{ display: 'none' }}
                                        multiple={true}
                                        accept="image/png, image/jpeg, image/jpg"
                                      />
                                      <IconButton
                                        onClick={() =>
                                          document?.getElementById('fileInput')?.click()
                                        }
                                      >
                                        <AttachFileIcon className="animatedAttachment"  color="primary"/>
                                      </IconButton>
                                    </>
                                    <div>
                                      <ArrowForwardIcon className="animatedSend"
                                      color="primary"
                                        sx={{
                                            cursor: "pointer",
                                        }} 
                                        onClick={SendMessageFromInput}/>
                                    </div>
                                  </InputAdornment>
                                ),
                              }}
                        
                        />
                    </FormControl>
                    <Popover 
                            id={emojiId}
                            open={emojiOpen}
                            anchorEl={emojiOn}
                            onClose={handleemojiClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            >
                            <Picker onEmojiClick={onEmojiClick}/>         
                        </Popover>
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
                    gridTemplateRows: "72px 2px auto 1px 80px ",
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
