import '../../App.css'; //voor app css voor background
import './SignUp.css'; //voor Loginpage specific Css
import { Avatar, TextField } from '@mui/material';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import { sendData } from '../../API/ApiCalls';
import React, { useEffect, useState } from 'react';
import '../../App.css'; //voor app css voor background
import './SignUp.css'; //voor Loginpage specific Css
import { Typography } from '@mui/material';
import Background from '../../components/backgrounds/background';
import { useHistory, useParams } from 'react-router-dom';
import { getSpecificInvite, getToken } from '../../API/Chat';
import { requestedInvite } from '../../classes/invites';
import { ConsumeEffect } from '../../API/ApiCalls';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Notification from '../../components/notification/notification';

interface CodeParams {
  Code: string | undefined;
}
export default function SignUp() {
  //signup page
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [error, setError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const { Code } = useParams<CodeParams>();
  const [isValid, setIsValid] = useState<boolean>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [invite, setInvite] = useState<requestedInvite | undefined>(undefined);
  useEffect(() => {
    if (Code) {
      ConsumeEffect(setIsLoaded, setInvite, () => getSpecificInvite(Code!));
    }
  }, [Code]);
  useEffect(() => {
    console.log(invite);
    if (invite) {
      setIsValid(invite.isValid);
    }
  }, [invite]);
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileHasChanged, setFileHasChanged] = useState<boolean>(false);
  let history = useHistory();
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfilePicture(reader.result as string);
        setFileHasChanged(true);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  async function signUpCall() {
    //Dit is de signup call die wordt aangeroepen wanneer je op de signup button drukt
    setDisabled(true); // dit zet de button uit
    if (
      email !== '' ||
      username !== '' ||
      password !== '' ||
      (passwordConfirm !== '' && password === passwordConfirm)
    ) {
      // als er iets ingevuld is
      // check if email, username and password are filled in to prevent errors
      const formData = new FormData();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      var henk = fileHasChanged
        ? formData.append('profilepicture', file!)
        : null;
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);

      await sendData(`/invites/${Code}`, formData).then((res) => {
        setTimeout(() => {
          getToken(email, password).then((result) => {
            localStorage.setItem('DogeToken', result.token.toString());
            history.push('/chat');
          });
        }, 3000);
      });
    } else {
      // als er een fout is
      setError(true); // zet Error zodat deze DE sign in button grijs maakt en de error wordt getoond in de notification en bovenaan het scherm
      setNotification(true); // Dit zet de Notification wanneer er een error is
      setTimeout(() => {
        // Wacht X seconde voordat de error wordt verwijderd
        setNotification(false); // Verwijder de notification
      }, 5000);
    }

    setDisabled(false); // zet de button weer aan
  }

  return (
    <>
      <Background className="out" />
      {isLoaded && invite && isValid ? (
        <div className="card Signup">
          <Card
            style={{
              width: '400px',
              height: '85vh',
            }}
          >
            <h2>Welcome to PhidippidesChat!</h2>
            <p>Enter you details below to create an account.</p>
            <div className="Notification">
              <Notification
                message="insuffice password, we don't accept weak passwords"
                notifyType={1}
                open={notification}
              />
            </div>
            <div className="FileInputDiv">
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

              <Avatar
                src={profilePicture}
                sx={{ width: '75px', height: '75px' }}
                className="Avatar"
              />
              <div
                onClick={() => document?.getElementById('fileInput')?.click()}
                className="Overlay"
              >
                Edit Profile{' '}
                <AttachFileIcon
                  sx={{ width: '35px', height: '35px' }}
                  className="OverLayPicture"
                />
              </div>
            </div>

            <div className="TextField">
              <TextField
                id="outlined-basic"
                required={true}
                label="Email Address"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                required={true}
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                type="password"
                helperText="A password must be at least 8 characters long have 3 symbols and 3 numbers 2 uppercase and 2 lowercase letters"
                required={true}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                type="password"
                required={true}
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <Button
              disabled={disabled}
              variant="contained"
              sx={{
                width: '50%',
                borderRadius: '30px',
              }}
              onClick={signUpCall}
            >
              Sign Up
            </Button>
          </Card>
        </div>
      ) : (
        <div>
          <Typography variant="h3" color="primary">
            Looks empty, try using a valid invite code
          </Typography>
        </div>
      )}
    </>
  );
}
