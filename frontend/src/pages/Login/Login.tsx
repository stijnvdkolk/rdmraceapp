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
import Token from '../../classes/Token';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [LoggedToken, setLoggedToken] = React.useState<Token | undefined>(undefined);
  let history = useHistory();

  async function loginCall(){
    setDisabled(true);
    var Rtoken : Token = await (await getToken(email, password)).token;
    if (Rtoken !== undefined) {
      setLoggedToken(Rtoken);
      localStorage.setItem('DogeToken', Rtoken.toString());
      history.push('/chat');
      //setTimeout(() => { }, 1000);
    }
    else {
      setError(true);
    }
    setDisabled(false);
  }
  return (
    <>
      <Background className='out'/>
      <div className="Notification">
        {
          //TODO: Notificatie als er een fout is
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
            <TextField id="emailInput"  value={email} onChange={e => setEmail(e.target.value)} label="Email Adress" variant="outlined" name='Email' />
          </div>
          <div className="secondField">
            <TextField type="password" value={password} onChange={e => setPassword(e.target.value)} color="primary" id="passwordInput" label="Password" variant="outlined" name='Password' />
          </div>
          <div>
            <Button variant="contained" disabled={disabled} sx={{
                    width: "50%",
                    marginTop: "5%",
                    borderRadius: "30px",
                  }}
                  onClick={loginCall}
                  >
                Sign In
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}