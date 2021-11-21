import React from 'react';
import '../../App.css'; //voor app css voor background
import './Chat.css';
import Navdrawer from '../../components/navdrawer/navdrawer';
import { Divider} from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import EuroIcon from '@mui/icons-material/Euro';
import NavListItem from '../../components/navListItem/navListItem';
import Background from '../../components/backgrounds/background';
import {Link, useParams} from "react-router-dom";
import ChatWindow from '../../components/ChatWindow/ChatWindow';


export default function Chat() {
    return (
        <div id="out" className="App dark background">
            <Background/>
            <div className="NavBar">   
                <Navdrawer name="asgfhjsadgfjasfhasfasfsaasfas" imageLink="https://images-ext-2.discordapp.net/external/NFu54hJJeAEsrCYWF0gaSEAj_Q7qAecwh2J4ZxlZWhE/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/238401356690489344/5eefd320644cfcaf5546ad55ea1ff6a3.png">
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
    );
}