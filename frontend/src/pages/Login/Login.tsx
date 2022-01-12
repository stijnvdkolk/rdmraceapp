import React from "react";
import "../../App.css"; //voor app css voor background
import "./Login.css"; //voor Loginpage specific Css
import { Button, Card, TextField } from "@mui/material"; //voor de login knoppen
import Background from "../../components/backgrounds/background"; //voor background
import { getToken } from "../../API/Chat"; //import getToken from Chat.js
import Token from "../../classes/Token"; //voor token
import { useHistory } from "react-router-dom"; //voor redirect naar chat
import Notification from "../../components/notification/notification"; // voor notification

export default function Login() {
  //Login page
  const [email, setEmail] = React.useState(""); //email input Dit wordt aangepast als je op een key drukt in de Email Input
  const [password, setPassword] = React.useState(""); //password input Dit wordt aangepast als je op een key drukt in de Password Input
  const [error, setError] = React.useState(false); // Dit is de error die wordt getoond als je niet ingelogd bent
  const [disabled, setDisabled] = React.useState(false); //Dit is de disabled state van de login button
  const [notification, setNotification] = React.useState(false); //Dit is de notification state van de login button deze wordt geshowed wanneer er een error is
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [LoggedToken, setLoggedToken] = React.useState<Token | undefined>( //Dit is de token die gebruikt wordt om in de chat te kunnen loggen
    undefined //Dit is undefined
  );
  let history = useHistory(); //Dit is de history die gebruikt wordt om naar de chat te gaan

  async function loginCall() {
    //Dit is de login call die wordt aangeroepen wanneer je op de login button drukt
    setDisabled(true); // dit zet de button uit
    var Rtoken: Token | undefined = undefined; // dit is de token die terug komt van de api

    if (email !== "" || password !== "") {
      // als er iets ingevuld is
      // check if email and password are filled in to prevent errors
      Rtoken = (await getToken(email, password))?.token as Token; // Krijg token uit API call probeert in RToken te zetten, anders Undefined
    }

    if (Rtoken != undefined) {
      // als er een token is doe het volgende
      setLoggedToken(Rtoken); // De token als bind aan LoggedToken
      localStorage.setItem("DogeToken", Rtoken.toString()); // Token opslaan in localstorage als string als key-DogeToken
      history.push("/chat"); // Ga naar /chat
      //setTimeout(() => { }, 1000);
    } else {
      // als er geen token is doe het volgende
      setError(true); // zet Error zodat deze DE sign in button grijs maakt en de error wordt getoond in de notification en bovenaan het scherm
      setNotification(true); // Dit zet de Notification wanneer er een error is
      setTimeout(() => {
        // Wacht X seconde voordat de error wordt verwijderd
        setNotification(false); // Verwijder de notification
      }, 5000); // 5 seconden
    }

    setDisabled(false); // Dit zet de sign in button weer actief
  }
  return (
    // Dit is de login pagina
    <>
      <Background className="out" />
      <div className="Notification">
        <Notification
          message="Invalid Email/Password Try again"
          notifyType={1}
          open={notification}
        />
      </div>
      <div className="card">
        <Card
          style={{
            width: "300px",
            height: "350px",
          }}
        >
          <h2>
            {error ? "Incorrect login details" : "Sign in to PhidippidesChat!"}
          </h2>
          <p>Enter your details below.</p>
          <div className="firstField">
            <TextField
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              variant="outlined"
              name="Email"
            />
          </div>
          <div className="secondField">
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="primary"
              id="passwordInput"
              label="Password"
              variant="outlined"
              name="Password"
            />
          </div>
          <div>
            <Button
              variant="contained"
              disabled={disabled || !email || !password ? true : false}
              sx={{
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
