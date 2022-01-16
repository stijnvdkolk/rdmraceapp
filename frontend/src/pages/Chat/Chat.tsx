/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "../../App.css"; //voor app css voor background
import "./Chat.css";
import Navdrawer from "../../components/navdrawer/navdrawer";
import { Avatar, CircularProgress, Divider, Toolbar } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EuroIcon from "@mui/icons-material/Euro";
import NavListItem from "../../components/navListItem/navListItem";
import { useHistory, useParams } from "react-router-dom";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import { getChannel, getChannels, GetDMs, getMessage, getPeople, getPerson, getSelf } from "../../API/Chat";
import Person from "../../classes/Person";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { green, grey, red, yellow } from "@mui/material/colors";
import Message from "../../classes/Message";
import { ConsumeEffect, getJWT } from "../../API/ApiCalls";
import { type } from "os";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Channel from "../../classes/Channel";
import Pfp from "../../classes/profilePicture";
import { DmChannel } from "../../classes/Dms";

interface UParams {
  channelID: string | undefined;
}
export default function Chat() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selfProfile, setselfProfile] = useState<Person | undefined>(undefined); //Person[]
  const { channelID } = useParams<UParams>();

  const [showAllDms, setShowAllDms] = useState<boolean>(false);

  let history = useHistory();
  const redirect = () => {
    history.push("/chat/publiek");
  };
  /*
   * @param {number} id
   * dit zet een chat in de history van de browser
   * de gebruiker kan dan op <- drukken om terug te gaan naar de vorige pagina
   */
  function redirectTo(id: string) {
    history.push("/chat/" + id);
  }
  //#region APICalls
  
  // useEffect(() => {
  //   console.log(getChannels());
  // }, []);

  useEffect(() => {
    ConsumeEffect(setIsLoaded, setselfProfile, () => {return getSelf();} );
  }, []);

  //Dit is Debug voor het aantal mensen te laten zien
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [channels, setchannels] = useState<Channel[] | undefined>(undefined); //Person[]
  useEffect(() => {
      ConsumeEffect(setIsCLoaded, setchannels, () => {return getChannels();} );
  }, []);
  const [isLoadedConversation, setIsLoadedConversation] = useState<boolean>(false);
  const [Conversation, setConversation] = useState<Channel | undefined>(undefined); //Person[]

  useEffect(() => {
    if (channelID != null) {
      ConsumeEffect(setIsLoadedConversation, setConversation, () => {return getChannel(channelID);} );
    }
  }, [channelID]);
  const [reload, setReload] = useState(false);
  const [DmChannel, setDmChannel] = useState<DmChannel | undefined>(undefined);
  const [isLoadedDm, setIsLoadedDm] = useState<boolean>(false);
  useEffect(() => {
    ConsumeEffect(setIsLoadedDm, setDmChannel, () => {return GetDMs();} );
  }, [reload]);
  const [roleAcces, setRoleAcces] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (channels){
      // setRoleAcces(channels[0].rolesAccess);
    }
  }, [channels]);
  useEffect(() => {
    setTimeout(() => {
        setReload(!reload); 
    }, 5000);
  }, [reload]);
  //#endregion
  return (
    <>
      {isLoaded ? (
      <>
        <Toolbar />
        <div className="NavBar">
          <Navdrawer mischellaneous={true} name={selfProfile !=null ? selfProfile.username : "" } imageLink={selfProfile
            !=null ? Pfp(selfProfile!.id! ,selfProfile!.profilePicture!) : "" }>
            {isLoadedDm && DmChannel != null && DmChannel && DmChannel.channels && DmChannel.channels.length > 0 ? (
            <>
              <Divider />
              <div onClick={() => {setShowAllDms(!showAllDms);}}
                style={{cursor: "pointer"}}
              >
                <label className="label leftside navbar pointer">Direct Messages</label>
                <div>
                  <ArrowForwardIcon  className={showAllDms ? "arrowww arrow-forward-icon-active" : "arrowww arrow-forward-icon"}
                    style={{
                      cursor: "pointer",                    
                    }}              
                    
                  />
              </div>
            </div>
              {showAllDms ? DmChannel.channels.map((dm) => (
              
              <NavListItem key={dm.id} 
                text={dm.users?.find((user)=> user.id !== selfProfile?.id)?.username}
                icon={<Avatar src={ Pfp(dm.users?.find((user)=> user.id !== selfProfile?.id)?.id! ,dm.users?.find((user) => user.id !== selfProfile?.id)?.profilePicture!)}
                  alt="" sx={{
                        width: "50px",
                        height: "50px",
                        }} />
                  }
                  onClickCommand={() => {redirectTo(dm.id!)}}
                  />
                  )) : DmChannel.channels.slice(0,5).map((dm) => (
                    <NavListItem key={dm.id} 
                    text={dm.users?.find((user)=> user.id !== selfProfile?.id)?.username}
                    icon={<Avatar src={ Pfp(dm.users?.find((user)=> user.id !== selfProfile?.id)?.id! ,dm.users?.find((user) => user.id !== selfProfile?.id)?.profilePicture!)}
                      alt="" sx={{
                            width: "50px",
                            height: "50px",
                            }} />
                      }
                      onClickCommand={() => {redirectTo(dm.id!)}}
                      />
                  ))}
            </>
            ) : ( <div></div>)}
            {isCLoaded && channels != null && channels !== undefined && selfProfile ? (
              
            <div>
              {channels.find((channel) => channel.type === "NEWS_CHANNEL") != null ? (
              <>
                <Divider />
                <label className="label leftside navbar">News Channels</label>
              </>
              ):( <></>)
              }
              {channels.map((channel) => (
              channel.type === "NEWS_CHANNEL" ? (
              <NavListItem key={channel.id} text={channel.name} icon={<ArticleRoundedIcon />}
              onClickCommand={() => {
              redirectTo(channel.id!);
              }}
              ></NavListItem>):(<></>)))}

              {channels.find((channel) =>
              channel.type === "PUBLIC_CHANNEL") != null ? (
              <>
                <Divider />
                <label className="label leftside navbar">Chat Channels</label>
              </>
              ):(
                <></>
              )}
              {channels.map((channel) => (
                channel.type === "PUBLIC_CHANNEL" ? (
                <NavListItem key={channel.id} text={channel.name} 
                  icon={<ChatRoundedIcon />}
                  onClickCommand={() => {
                  redirectTo(channel.id!);
                }}
                >
                </NavListItem>
                ):( <></>)))}
              {channels.map((channel ) => ( channel.type === "PRIVATE_CHANNEL" && channel!.rolesAccess!.includes(selfProfile?.role) 
                ? ( 
                <NavListItem key={channel.id} text={channel.name} icon={<LockRoundedIcon />}
                onClickCommand={() => {
                redirectTo(channel.id!);
                }}
                >

                </NavListItem>)
              : ( <></>)))}




            </div>
            ):(
            <div />
            )}
          </Navdrawer>
        </div>
        {isLoadedConversation && Conversation != null ? (
        <ChatWindow imageLink="https://cdn.rdmraceapp.nl/embed/avatars/default.png" name={Conversation.name === "" ? "Direct Message" : Conversation.name} ></ChatWindow>
        ) : (
        <div />
        )}
      </>
      ) : (
      <CircularProgress />
      )}
    </>
  );
}


