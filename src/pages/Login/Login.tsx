import React from 'react';
import '../../App.css'; //voor app css voor background
import './Login.css'; //voor Loginpage specific Css
import {Card, TextField} from '@mui/material';
import Background from '../../components/backgrounds/background';
import Buttoned from '../../components/button/button';
//Login in

export default function Login() {
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