import React from 'react';
import '../../App.css'; //voor app css voor background
import './Login.css'; //voor Loginpage specific Css
import {Button, Card, TextField} from '@mui/material';
import Background from '../../components/backgrounds/background';
import Buttoned from '../../components/button/button';
import Notification from '../../components/notification/notification';
import { postJson } from '../../API/ApiCalls';
import LoginType from './LoginType';
import { getToken } from '../../API/Chat';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [LoggedToken, setLoggedToken] = React.useState<string | undefined>();
  async function loginCall(){
    setError(true);
    setLoggedToken(await getToken(email, password));
    console.log(LoggedToken);
     // 

  }
  return (
    <>
      <Background className='out'/>
      <div className="Notification">
        {
          //TODO: Add a notification if the user is not logged in 
        }
      </div>
      <div className="card">
        <Card
          style={{
            width: "300px",
            height: "350px",
          }}
        >
          <h2>
            {error ? "Incorrect login details" : "Sign in to PhidippidusChat!"}
          </h2>
          <p>
            Enter you details below.
          </p>
          <div className="firstField">
            <TextField id="emailInput" value={email} onChange={e => setEmail(e.target.value)} label="Email Adress" variant="outlined" name='Email' />
          </div>
          <div className="secondField">
            <TextField type="password" value={password} onChange={e => setPassword(e.target.value)} color="primary" id="passwordInput" label="Password" variant="outlined" name='Password' />
          </div>
          <div>
            <Button variant="contained" sx={{
                    width: "50%",
                    marginTop: "5%",
                    borderRadius: "30px",
                  }}
                  onClick={loginCall}
                  >
                Sign Up
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}