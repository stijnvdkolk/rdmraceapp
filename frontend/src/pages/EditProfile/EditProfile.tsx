import { Avatar, Button, Card, Divider, IconButton, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getSelf } from "../../API/Chat";
import Person from "../../classes/Person";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import "./EditProfile.css";
import Pfp from "../../classes/profilePicture";
import { Label } from "@mui/icons-material";

export default function UserProfile() {
    let history = useHistory();

    const [aboutMe, setAboutMe] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [userName, setUserName] = useState<string>("");



    const [meProfile, setMeProfile] = useState<Person | undefined>(undefined); //Person
    const [meLoaded, setMeLoaded] = useState<boolean>(false);
    ConsumeEffect(setMeLoaded, setMeProfile, () => {
        return getSelf();
    });
    //history.goBack();
    return (
        <div className="MasterCard"  >
            {meLoaded && meProfile && (
                <Card 
                    className="Kaart"
                    sx={{
                        gridColumn: "2",
                        gridRow: "2",
                    }} 
                >
                    <div className="Head">
                        <Typography className="MyAccount" variant="h3" sx={{marginLeft: "40px"}}>
                            My Account
                        </Typography>
                        <Divider sx={{width: "130%"}}/>
                    </div>
                    <div className="Middle">
                        <div className="FileInputDiv">
                            <input //CrackHead Html
                                    id="fileInput"
                                    type="file"
                                    style={{ display: 'none' }}
                                    multiple={false}
                                    />
                            <Avatar src={Pfp(meProfile.id, meProfile.profilePicture)} sx={{width: "75px", height: "75px"}} className="Avatar" />
                        </div>
                        <Button variant="contained" color="primary" sx={{gridRow: 1, gridColumn: 2 }}></Button>
                        <Divider/>
                        <div className="NameInput">
                            <Typography id="Name" variant="h5"  className="InputBox">Name</Typography>
                            <Typography id="Name" variant="h6"  className="InputBox">{meProfile.username}</Typography>
                        </div>
                        <div className="AboutMeInput">
                            <Typography id="AboutMe" variant="h5" className="InputBox">About me</Typography>
                            <Typography id="Name" variant="h6"  className="InputBox">{meProfile.aboutMe}</Typography>
                        </div>
                        <div>
                            
                            <IconButton
                            onClick={() =>
                                document?.getElementById('fileInput')?.click()
                            }
                            >
                                <AttachFileIcon className="animatedAttachment" />
                            </IconButton>
                        </div>
                    </div>
                    <div className="Tail">

                    </div>
                    
                </Card>
            )}
        </div>
    );
}