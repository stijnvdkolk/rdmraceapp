import React, { useEffect, useState } from 'react';
import '../../App.css'; //voor app css voor background
import './Chat.css';
import Navdrawer from '../../components/navdrawer/navdrawer';
import { CircularProgress, Divider} from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import EuroIcon from '@mui/icons-material/Euro';
import NavListItem from '../../components/navListItem/navListItem';
import Background from '../../components/backgrounds/background';
import {Link} from "react-router-dom";
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


    useEffect(() => {
        fetch("https://localhost:7023/testing") // Debug
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
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
                        <Background/>
                        <div className="NavBar">   
                            <Navdrawer name={ items != null ? items![0].name : "" } imageLink={ items != null ? items![0].profilePicture : "" }>
                            <Divider/>
                            <label className="label leftside navbar">Nieuws Kanalen</label>
                            <NavListItem text="Belangrijk Nieuws" icon={<AccessibleIcon />} onClickCommand={() => console.log("Nieuw Icons!")}/>
                            <Divider />
                            <label className="label leftside navbar">Chat Kanalen</label>
                            <NavListItem text="Publiek" icon={<ChildCareIcon />} onClickCommand={() => console.log("Nieuw Icons!")}/>
                            <NavListItem text="Team Genoten" icon={<ChildFriendlyIcon />} onClickCommand={() => console.log("Nieuw Icons!")}/>
                            <NavListItem text="one more channel cuz why not" icon={<EuroIcon />}/>
                            </Navdrawer>
                        </div>
                        <div className="Content">
                            <h5>Hello World</h5>
                            
                            <Link to="/Chat/Publiek"/>
                            <ChatWindow/>
                        </div>
                    </div>
                ) : (
                    <CircularProgress />
                )
            }
        </>
        
    );
}