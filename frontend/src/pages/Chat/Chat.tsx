/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import '../../App.css'; //voor app css voor background
import './Chat.css';
import Navdrawer from '../../components/navdrawer/navdrawer';
import { Avatar, CircularProgress, Divider, Toolbar} from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import EuroIcon from '@mui/icons-material/Euro';
import NavListItem from '../../components/navListItem/navListItem';
import {useHistory, useParams} from "react-router-dom";
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import { getMessage, getPerson } from '../../API/Chat';
import Person from '../../classes/Person';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { green, grey, red, yellow } from '@mui/material/colors';
import Message from '../../classes/Message';

interface UParams{
    channelID: string | undefined;
}

export default function Chat() {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<Person[] | undefined>(undefined); //Person[]


    const { channelID } = useParams<UParams>();

    let history = useHistory();
    const redirect = () => {
        history.push("/chat/publiek");
    }

    /*
    * @param {number} id
    * dit zet een chat in de history van de browser
    * de gebruiker kan dan op <- drukken om terug te gaan naar de vorige pagina
    */
    function redirectTo(id: number) {
        history.push("/chat/" + id);
    }    



    useEffect(() => {
        fetch("https://localhost:7023/testing") // Debug
            .then(res => res.json())
            .then((result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
    const [contacts, setcontacts] = useState<Person[] | undefined>(undefined); //Person[]
    useEffect(() => {
        fetch("https://localhost:7023/getPeople/5") // Debug
            .then(res => res.json())
            .then(
                (result) => {
                    setIsCLoaded(true);
                    setcontacts(result);
                },
                (error) => {
                    setIsCLoaded(true);
                    setError(error);
                }
            )
    }, []);

    const [isLoadedDM, setIsLoadedDM] = useState<boolean>(false);
    const [DM, setDM] = useState<Person | undefined>(undefined); //Person[]
    useEffect(() => {
        if (channelID != null) {
            getPerson(channelID)
            .then(
                result => {
                    setIsLoadedDM(true);
                    setDM(result);
                },
                error => {
                    setIsLoadedDM(true);
                    setError(error);
                }
            )
        }
    }, [channelID])

    return (
        <>
            {
                isLoaded ? (
                    <>
                        
                        <Toolbar /> 
                        <div className="NavBar">   
                            <Navdrawer OverrideDarkmode={true} mischellaneous={true} name={ items != null ? items[0].name : "" } imageLink={ items != null ? items![0].profilePicture : "" }>
                                
                                {isCLoaded && contacts != null ? (
                                    <div>
                                        <Divider />
                                        {contacts.map(contact => (                                            
                                            <NavListItem key={contact.id} text={contact.name} onClickCommand={() => {redirectTo(contact.id!)}} >                                             
                                                <FiberManualRecordIcon  sx={{
                                                    color: contact.status === "Online" ? green[500] : contact.status === "Away" ? yellow[500] : contact.status === "Do not Disturb" ? red[500] : grey[500],
                                                    order: 2,
                                                    marginLeft: "-20px",
                                                    marginTop: "25px",
                                                    position: "relative",
                                                }} />
                                                <Avatar alt="" src={contact.profilePicture} sx={{
                                                    width: "50px",
                                                    height: "50px",

                                                }}/>
                                                
                                            </NavListItem>

                                           
                                        ))}
                                    </div>) : (<div/> )}
                                <Divider/>
                                <label className="label leftside navbar">Nieuws Kanalen</label>
                                <NavListItem text="Belangrijk Nieuws" icon={<AccessibleIcon />} onClickCommand={() => console.log("Nieuw Icons!")}/>
                                <Divider />
                                <label className="label leftside navbar">Chat Kanalen</label>
                                <NavListItem text="Publiek" icon={<ChildCareIcon />} onClickCommand={redirect}/>
                                <NavListItem text="Team Genoten" icon={<ChildFriendlyIcon />} onClickCommand={() => window.location.href = "/team"}/>
                                <NavListItem text="one more channel cuz why not" icon={<EuroIcon />}/>
                            </Navdrawer>                           
                        </div>
                    {isLoadedDM && DM != null ? (                
                        <ChatWindow name={DM !== undefined ? DM.name : "Egbert" } imageLink={ DM !== undefined ? DM!.profilePicture : "" } >
                                
                        </ChatWindow>
                    ) : (<div/>)}
                    
                    </>
                    ) 
                : (<CircularProgress />)                 
            }
        </>
        
    );
}
