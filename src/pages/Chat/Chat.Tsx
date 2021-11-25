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
import Background from '../../components/backgrounds/background';
import {Link, useHistory, useParams} from "react-router-dom";
import ChatWindow from '../../components/ChatWindow/ChatWindow';
class Person
{
    Id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
}


export default function Chat() {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [items, setItems] = useState<Person[] | undefined>(undefined); //Person[]

    let history = useHistory();
    const redirect = () => {
        history.push("/chat/publiek");
    }
    let channelID = useParams();
    console.log(channelID);

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

    
    console.log(items);


    return (
        <>
            {
                isLoaded ? (
                    <div id="out" className="App dark background">
                        
                        <Toolbar /> 
                        <div className="NavBar">   
                            <Navdrawer name={ items != null ? items[0].name : "" } imageLink={ items != null ? items![0].profilePicture : "" }>
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
                        <ChatWindow/>
                    </div>
                    ) 
                : (<CircularProgress />) 
                
            }
        </>
        
    );
}