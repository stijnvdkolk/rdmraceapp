import { Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ConsumeEffect, patchData } from "../../API/ApiCalls";
import { getPerson, getSelf } from "../../API/Chat";
import Person from "../../classes/Person";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import "./EditProfile.css";
import Pfp from "../../classes/profilePicture";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Background from "../../components/backgrounds/background";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Notification from "../../components/notification/notification"; 
interface AParams {
    personID: string | undefined;
  }
export default function UserProfile() {
    let history = useHistory();
    const { personID } = useParams<AParams>(); //
    const [aboutMe, setAboutMe] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [anotherProfile, setAnotherProfile] = useState<Person | undefined>(undefined);
    const [anotherLoaded, setAnotherLoaded] = useState<boolean>(false);
    const [meProfile, setMeProfile] = useState<Person | undefined>(undefined); //Person
    const [meLoaded, setMeLoaded] = useState<boolean>(false);
    useEffect(() => {
        ConsumeEffect(setMeLoaded, setMeProfile, () => {
            return getSelf();
        });
        if(personID){
            ConsumeEffect(setAnotherLoaded, setAnotherProfile, () => {
                return getPerson(personID);
            });
        }
    }, []);
    useEffect(() => {
        Reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meLoaded, meProfile, personID, anotherLoaded, anotherProfile]);
    function Reset(){
        if(anotherLoaded && anotherProfile ){
            setAboutMe(anotherProfile.aboutMe);
            setEmail(anotherProfile.email!);
            setProfilePicture(Pfp(anotherProfile.id,anotherProfile.profilePicture));
            setUserName(anotherProfile.username);
            setPassword("");
            return;
        }
        else if (meLoaded && meProfile) {
            setAboutMe(meProfile.aboutMe);
            setEmail(meProfile.email!);
            setProfilePicture(Pfp(meProfile.id, meProfile.profilePicture));
            setUserName(meProfile.username);
            setPassword("");
        }
    }

    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileHasChanged, setFileHasChanged] = useState<boolean>(false);
    const [usernameHasChanged, setUsernameHasChanged] = useState<boolean>(false);
    const [aboutMeChanged, setAboutMeChanged] = useState<boolean>(false);
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
    const [emailChanged, setEmailChanged] = useState<boolean>(false);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    useEffect(() => {
        if (file && fileHasChanged && file !== undefined && file !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProfilePicture(reader.result as string);
                setFileHasChanged(true);
            };
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    useEffect(() => {
        if(userName){
            if(userName.length > 16){
                setUserName(userName.substring(0, 20));
            }
            if(userName.length > 3 && userName !== meProfile?.username && userName !== anotherProfile?.username){
                setUsernameHasChanged(true);
            }
            else{
                setUsernameHasChanged(false);
            }
        }
        else{
            setUsernameHasChanged(false);
        }
        if (aboutMe){
            if(aboutMe.length > 120){
                setAboutMe(aboutMe.substring(0, 120));
            }
            if (aboutMe !== meProfile?.aboutMe && aboutMe !== anotherProfile?.aboutMe) {
                setAboutMeChanged(true);
            }
            else{
                setAboutMeChanged(false);
            }
        }
        else{
            setAboutMeChanged(false);        
        }
        if(password){
            if (password.length > 8 ) {
                setPasswordChanged(true);
            }
            else{
                setPasswordChanged(false);
            }
        }
        else{
            setPasswordChanged(false);
        }
        if(email){
            if (email.length > 20) {
                setEmail(email.substring(0, 20));
            }
            if (email.length > 6){
                setEmailChanged(true);
            }
            else{
                setEmailChanged(false);
            }
        }
        else{
            setEmailChanged(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName, aboutMe, password, email ]);
    const [notification, setNotification] = useState(false); 
    async function SubmitEverything(){
        var formdata = new FormData();
        //"https://phidippisus.rdmraceapp.nl/users/@me"
        var henk = fileHasChanged ? formdata.append("profilepicture", file!) : null;
        henk = usernameHasChanged ? formdata.append("username", userName) : null;
        henk = aboutMeChanged ? formdata.append("aboutMe", aboutMe) : null;
        henk = passwordChanged ? formdata.append("password", password) : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        henk = emailChanged ? formdata.append("email", email) : null;

        handleClose();
        if(personID){
            await patchData(`/users/${personID}`, formdata).then((result) => {                
                if(result === "Bad Request"){
                    setNotification(true); // Dit zet de Notification wanneer er een error is
                    setTimeout(() => {
                    // Wacht X seconde voordat de error wordt verwijderd
                    setNotification(false); // Verwijder de notification
                    }, 5000);
                }
                else{
                    history.push(`/admin`);
                }
            });
        }
        else{
            await patchData("/users/@me", formdata).then((result) => {
                if(result === "Bad Request"){
                    setNotification(true); // Dit zet de Notification wanneer er een error is
                    setTimeout(() => {
                        // Wacht X seconde voordat de error wordt verwijderd
                        setNotification(false); // Verwijder de notification
                    }, 5000);
                }
                else{
                    history.push("/chat");
                }
            });
        }
    }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="MasterCard"  >
            {meLoaded && meProfile && (
                <Card 
                    className="Kaart"
                    sx={{
                        justifySelf: "center",
                        gridColumn: "2 ",
                        gridRow: "2",
                        minWidth: "320px",
                        maxWidth: "600px",
                        height: "100%",
                    }} 
                >
                    <Notification
                        message="Invalid Email/Password Think about using a good Email and a Strong password"
                        notifyType={1}
                        open={notification}
                    />
                    <div className="Head">
                        <Button variant="text" sx={{float: "left", width: "90px", height:"40px", marginLeft: "5px", marginTop:"10px",  marginRight: "10px"}}
                            onClick={() => personID ?  history.push("/admin") : history.push("/chat") }
                        >
                            <ArrowBackOutlinedIcon />
                              back
                        </Button>
                        <Typography color="primary" className="MyAccount" variant="h3" sx={{marginLeft: "30px"}}>
                            Profile
                        </Typography>
                        <div className="EndFloat" >
                            <IconButton sx={{ width: "50px", height:"50px"}} onClick={Reset}>
                                <RestartAltOutlinedIcon />
                            </IconButton>
                            
                            <Background className="BGC"/>
                        </div>
                        <Divider sx={{width: "130%"}}/>
                        
                    </div>
                    <div className="Middle">
                        <div className="FileInputDiv"
                            
                        >
                            <input //CrackHead Html
                                    id="fileInput"
                                    type="file"
                                    style={{ display: 'none' }}
                                    multiple={false}
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => {
                                        setFile(e.target.files![0]);
                                    }}
                                    />
                                                        
                            <Avatar src={profilePicture} sx={{width: "75px", height: "75px"}} className="Avatar" />
                            <div onClick={() =>
                                document?.getElementById('fileInput')?.click()
                            } className="Overlay">Edit Profile <AttachFileIcon sx={{width: "35px", height: "35px"}} className="OverLayPicture"/></div>
                        </div>
                        
                        
                        {/* <Button variant="contained" color="primary" sx={{gridRow: 1, gridColumn: 2 }}></Button> */}
                        <Divider sx={{gridRow: 1, gridColumn: "1/5"}} />
                        <div className="NameInput">
                            <TextField sx={{width: "275px"}} label="Name" color="primary" variant="standard" onChange={(e) => setUserName(e.target.value)} value={userName} ></TextField>
                        </div>
                        <div className="EmailInput">
                            <TextField sx={{width: "275px"}} label="Email" color="primary" variant="standard" onChange={(e) => setEmail(e.target.value)} value={email} ></TextField>
                        </div>
                        <div className="AboutMeInput">
                            <TextField sx={{width: "275px"}} label="About me" color="primary"  variant="standard" onChange={(e) => setAboutMe(e.target.value)} value={aboutMe} multiline rows={4} ></TextField>
                        </div>
                        <div className="PasswordInput">
                        <TextField sx={{width: "275px"}} label="Password" color="primary" type={showPassword ? 'text' : 'password'} variant="standard" onChange={(e) => setPassword(e.target.value)} value={password} >

                        </TextField>
                        </div>

                    </div>
                    <div className="Tail">
                        <Button variant="contained" color="primary" onClick={handleClickOpen} >
                            Save Changes &nbsp;
                            <SaveOutlinedIcon />
                        </Button>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to apply these changes?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                
                                {usernameHasChanged ? `Username will be changed to ${userName} \n` : "" }
                                {usernameHasChanged ? <br/> : ""}                           
                                {aboutMeChanged ? `\nAbout me will be changed to: ${aboutMe}` : ""}
                                {aboutMeChanged ? <br/> : ""}
                                {emailChanged ? `\nEmail will be changed to: ${email}` : ""}
                                {emailChanged ? <br/> : ""}
                                {passwordChanged ? `\nPassword will be changed` : ""}

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={SubmitEverything} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    
                </Card>
            )}
        </div>
    );
}