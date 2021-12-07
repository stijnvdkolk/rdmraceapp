//import Background from "../../components/backgrounds/background";
import {Card} from "@mui/material"
import "../Admin/admin.css";
import NavDrawer from '../../components/navdrawer/navdrawer';
import { useState, useEffect } from "react";
import {Divider} from "@mui/material";
import NavListItem from "../../components/navListItem/navListItem";
import {useHistory} from "react-router-dom";

class Person
{
    id : number | undefined;
    name : string | undefined;
    profilePicture : string | undefined;
}

export default function Admin(){


    let history = useHistory();
    function redirectTo(id: number) {
        history.push("/Admin/" + id);
        console.log("Redirect to: "+ id);
    }  
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<any>(null);
    const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
    const [contacts, setcontacts] = useState<Person[] | undefined>(undefined); //Person[]
    useEffect(() => {
        fetch("https://localhost:7023/getPeople/10") // Debug
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

    
    return(
        <>
            <div className="Admin">
                <div className="Drawer">
                    <NavDrawer>
                        {isCLoaded && contacts != null ? (
                            <div>
                                <Divider />
                                {contacts.map(contact => (                                            
                                    <NavListItem key={contact.id} text={contact.name} onClickCommand={() => {redirectTo(contact.id!)}} >                                             
                                        <img className="profile" width="75" alt="" src={contact.profilePicture}/>
                                    </NavListItem>

                                
                                ))}
                            </div>) : (<div/> )}
                    </NavDrawer>
                </div>
                <div className="options">
                    
                    <Card
                        style={{
                            width: "65vw",
                            height: "90vh",
                            borderRadius: "16px",
                            marginTop: "43px",
                            marginRight: "10px",
                            marginLeft: "25vw",
                        }}>
                            

                        </Card>
                </div>
            </div>
        </>
    );
}