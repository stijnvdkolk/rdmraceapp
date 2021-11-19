import React from 'react';
import './App.css';
import {IconButton, Input, TextField} from '@mui/material';
import {Card} from '@mui/material';
import Background from './components/backgrounds/background';
import Buttoned from './components/button/button';
import {Button} from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import { PhotoCamera } from '@mui/icons-material';

function App() {
  return (
    <div id="out" className="App dark background">
      <Background/>
      <div className="card Signup">
        <Card
          style={{
            width: "400px",
            height: "550px",
          }}
        >
          <h2>
            Welcome to PhidippidusChat!
          </h2>
          <p>
            Enter you details below to create an account.
          </p>
          
          <label htmlFor="contained-button-file">
            <Input id="contained-button-file" name="profilePic" type="file" sx={{
              height: 0,
              width: 0,
            }} />
            <Button variant="contained" component="span">
              Upload Profile Picture
            </Button>
            
          </label>

          <div className="TextField">
            <TextField id="outlined-basic" required={true} label="Email Adress" variant="outlined"/>
            <TextField id="outlined-basic" required={true} label="Username" variant="outlined" />
            <TextField type="password" required={true} id="outlined-basic" label="Password" variant="outlined" />
            <TextField type="password" required={true} id="outlined-basic" label="Confirm Password" variant="outlined" />
          </div>
          <Buttoned url="www.google.com" text="Sign up" 
            style={{
            marginTop: 0,
            marginLeft: 17,
            borderRadius: "30px",
            backgroundColor: "#CF0E47",
            left: 65
            }}/>
        </Card>
      </div>
    </div>
  );
}

export default App;
/*
function App() {
  return (
    <div id="out" className="App dark background">
      <Background/>
      <div className="card">
        <Card
          style={{
            width: "300px",
            height: "350px",
          }}
        >
          <h2>
            Sign in to PhidippidusChat!
          </h2>
          <p>
            Enter you details below.
          </p>
          <div className="firstField">
            <TextField id="outlined-basic" label="Email Adress" variant="outlined" />
          </div>
          <div className="secondField">
            <TextField type="password" id="outlined-basic" label="Password" variant="outlined" />
          </div>
          <div>
            <Buttoned url="www.google.com" text="Sign in" 
            style={{
            marginTop: 0,
            marginLeft: 17,
            borderRadius: "30px",
            backgroundColor: "#CF0E47",
            left: 65
            }}/>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
*/