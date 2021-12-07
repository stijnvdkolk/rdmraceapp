import React from 'react';
import '../../App.css'; //voor app css voor background
import './SignUp.css'; //voor Loginpage specific Css
import {Input, TextField} from '@mui/material';
import {Card} from '@mui/material';
import Background from '../../components/backgrounds/background';
import Buttoned from '../../components/button/button';
import {Button} from '@mui/material';

export default function SignUp() {
  return (
    <>
      <Background className='out'/>
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
    </>
  );
}

