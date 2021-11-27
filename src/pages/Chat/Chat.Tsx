import { useEffect, useState } from 'react';
import '../../App.css'; //voor app css voor background
import './Chat.css';
import Navdrawer from '../../components/navdrawer/navdrawer';
import { CircularProgress, Divider, Toolbar} from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import EuroIcon from '@mui/icons-material/Euro';
import NavListItem from '../../components/navListItem/navListItem';
import {useHistory, useParams} from "react-router-dom";
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import { getPerson } from '../../API/Chat';
class Person
{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
}

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
    function redirectTo(id: number) {
        history.push("/chat/" + id);
        console.log("Redirect to: "+ id);
    }

    // const location = useLocation();

    // const queryParams = useMemo<UParams>(() => {
    //     const params = new URLSearchParams(location.search);

    //     return {
    //         channelID: params.get("channelID"),
    //     }
    // }, [location]);

    console.log(channelID);

    //#Region Test
    // const [para, setPara] = useState<UParams>();
    // const para = useParams<UParams>();
    // useEffect(() => {
    //     setPara(useParams<UParams>());
    // }, [])
    //#EndRegion
    
    useEffect(() => {
        fetch("https://localhost:7023/testing") // Debug
            .then(res => res.json())
            .then(
                (result) => {
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
    }, [])
    const [isLoadedDM, setIsLoadedDM] = useState<boolean>(false);
    const [DM, setDM] = useState<Person | undefined>(undefined); //Person[]
    useEffect(() => {
        if (channelID != null) {
            getPerson(channelID)
            .then(
                result => {
                    console.log(result);
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
    console.log(DM);

    return (
        <>
            {
                isLoaded ? (
                    <div id="out" className="App dark background">
                        
                        <Toolbar /> 
                        <div className="NavBar">   
                            <Navdrawer name={ items != null ? items[0].name : "" } imageLink={ items != null ? items![0].profilePicture : "" }>
                                
                                {isCLoaded && contacts != null ? (
                                    <div>
                                        <Divider />
                                        {contacts.map(contact => (                                            
                                            <NavListItem key={contact.id} text={contact.name} onClickCommand={() => {redirectTo(contact.id!)}} >                                             
                                                <img className="profile" width="75" alt="" src={contact.profilePicture}/>
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
                        <ChatWindow name={DM !== undefined ? DM.name : "Egbert" } imageLink={ DM !== undefined ? DM!.profilePicture : "" }  />
                    ) : (<div/>)}
                    
                    </div>
                    ) 
                : (<CircularProgress />) 
                
            }
        </>
        
    );
}