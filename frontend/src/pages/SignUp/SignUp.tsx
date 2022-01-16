import React from "react";
import "../../App.css"; //voor app css voor background
import "./SignUp.css"; //voor Loginpage specific Css
import { Input, TextField } from "@mui/material";
import { Card } from "@mui/material";
import Background from "../../components/backgrounds/background";
import { Button } from "@mui/material";
import { sendData } from "../../API/ApiCalls";

export default function SignUp() {
  //signup page
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [error, setError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [notification, setNotification] = React.useState(false);

  async function signUpCall() {
    //Dit is de signup call die wordt aangeroepen wanneer je op de signup button drukt
    setDisabled(true); // dit zet de button uit
    if (
      email !== "" ||
      username !== "" ||
      password !== "" ||
      (passwordConfirm !== "" && password === passwordConfirm)
    ) {
      // als er iets ingevuld is
      // check if email, username and password are filled in to prevent errors
      const formData = new FormData();

      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);

      await sendData("/api/invite/@invite_id", formData);
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
      <div className="card Signup">
        <Card
          style={{
            width: "400px",
            height: "550px",
          }}
        >
          <h2>Welcome to PhidippidesChat!</h2>
          <p>Enter you details below to create an account.</p>

          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              name="profilePic"
              type="file"
              sx={{
                height: 0,
                width: 0,
              }}
            />
            <Button variant="contained" component="span">
              Upload Profile Picture
            </Button>
          </label>

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
            variant="contained"
            sx={{
              width: "50%",
              borderRadius: "30px",
            }}
            onClick={signUpCall}
          >
            Sign Up
          </Button>
        </Card>
      </div>
    </>
  );
}
