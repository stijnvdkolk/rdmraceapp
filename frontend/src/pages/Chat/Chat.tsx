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
import { getChannels, getMessage, getPeople, getPerson, getSelf } from "../../API/Chat";
import Person from "../../classes/Person";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { green, grey, red, yellow } from "@mui/material/colors";
import Message from "../../classes/Message";
import { ConsumeEffect, getJWT } from "../../API/ApiCalls";
import { type } from "os";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Channel from "../../classes/Channel";

interface UParams {
  channelID: string | undefined;
}
export default function Chat() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selfProfile, setselfProfile] = useState<Person | undefined>(undefined); //Person[]
  const { channelID } = useParams<UParams>();

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
  
  useEffect(() => {
    console.log(getChannels());
  }, []);

  useEffect(() => {
    ConsumeEffect(setIsLoaded, setselfProfile, () => {return getSelf();} );
  }, []);

  //Dit is Debug voor het aantal mensen te laten zien
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [channels, setchannels] = useState<Channel[] | undefined>(undefined); //Person[]
  useEffect(() => {
      ConsumeEffect(setIsCLoaded, setchannels, () => {return getChannels();} );
  }, []);
  // useEffect(() => {
  //   getPeople(5).then(
  //       (result) => {
  //         setIsCLoaded(true);
  //         setcontacts(result);
  //       },
  //       (error) => {
  //         setIsCLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);
  const [isLoadedDM, setIsLoadedDM] = useState<boolean>(false);
  const [DM, setDM] = useState<Person | undefined>(undefined); //Person[]

  useEffect(() => {
    if (channelID != null) {
      ConsumeEffect(setIsLoadedDM, setDM, () => {return getPerson(channelID);} );
    }
  }, [channelID]);

  //#endregion
  return (
    <>
      {isLoaded ? (
        <>
          <Toolbar />
          <div className="NavBar">
            <Navdrawer
              mischellaneous={true}
              name={selfProfile != null ? selfProfile.username : ""}
              imageLink={selfProfile != null ? selfProfile!.profilePicture : ""}
            >
              {isCLoaded && channels != null && channels !== undefined ? (
                <div>
                  {channels.find((channel) => channel.type === "DIRECT_MESSAGES") != null ? (
                      <>
                        <Divider/>
                        <label className="label leftside navbar">Direct Messages</label>
                      </>
                    ):( <></>)
                    }
                    {channels.map((channel) => (
                    channel.type === "DIRECT_MESSAGES" ?  (
                      <NavListItem
                        key={channel.id}
                        text={channel.name}
                        onClickCommand={() => {
                          redirectTo(channel.id!);
                        }}
                      >
                        {/* <FiberManualRecordIcon
                          sx={{
                            color:
                              contact.status === "Online"
                                ? green[500]
                                : contact.status === "Away"
                                ? yellow[500]
                                : contact.status === "Do not Disturb"
                                ? red[500]
                                : grey[500],
                            order: 2,
                            marginLeft: "-20px",
                            marginTop: "25px",
                            position: "relative",
                          }}
                        />
                        <Avatar
                          alt=""
                          src={contact.profilePicture}
                          sx={{
                            width: "50px",
                            height: "50px",
                          }}
                        /> */}                     
                      </NavListItem>
                      ):(<></>)
                    ))}
                {channels.find((channel) => channel.type === "NEWS_CHANNEL") != null ? (
                    <>
                      <Divider/>
                      <label className="label leftside navbar">News Channels</label>                      
                    </>
                    ):( <></>)
                    }
                    {channels.map((channel) => (
                    channel.type === "NEWS_CHANNEL" ?  (
                      <NavListItem
                        key={channel.id}
                        text={channel.name}
                        icon={<ArticleRoundedIcon />}
                        onClickCommand={() => {
                          redirectTo(channel.id!);
                        }}
                      >                   
                      </NavListItem>
                      ):(<></>)
                ))}
                {channels.find((channel) => 
                  channel.type === "PUBLIC_CHANNEL" || channel.type === "PRIVATE_CHANNEL" ) 
                  != null ? (
                    <>
                      <Divider/>
                      <label className="label leftside navbar">Chat Channels</label>                      
                    </>
                  ):(
                    <></>
                  )
                }
                {channels.map((channel) => (
                  channel.type === "PUBLIC_CHANNEL" || channel.type === "PRIVATE_CHANNEL" ?  (
                    <NavListItem
                      key={channel.id}
                      text={channel.name}
                      icon={channel.type === "PRIVATE_CHANNEL" ? <LockRoundedIcon /> : <ChatRoundedIcon />}
                      onClickCommand={() => {
                        redirectTo(channel.id!);
                      }}
                    >                   
                    </NavListItem>
                  ):(<></>)
                  ))
                }
                </div>
              ):(
                <div />
              )}
            </Navdrawer>
          </div>
          {isLoadedDM && DM != null ? (
            <ChatWindow
              name={DM !== undefined ? DM.username : "Egbert"}
              imageLink={DM !== undefined ? DM!.profilePicture : ""}
            ></ChatWindow>
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


