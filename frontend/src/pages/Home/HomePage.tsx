import IProps from "../../components/IProps";
import React from "react";
import logo from "./images/Small Logo.svg";
import "./HomePage.css";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Buttoned from "../../components/button/button";
import {
  Container,
  CssBaseline,
  Typography,
  Stack,
  Button,
  Card,
} from "@mui/material";
import Background from "../../components/backgrounds/background";
//comment
export default function HomePage(props: IProps) {
  return (
    /*Background*/
    <div className="homepageContainer">
      <Container
        sx={{
          marginRight: 0,
          paddingRight: 0,
          marginLeft: 0,
          paddingLeft: 0,

          width: "80vw",
        }}
      >
        <div className="DMT">
          <Background />
        </div>

        <Card
          className="homepageBox"
          sx={{
            marginTop: 0,
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: 0,
          }}
        >
          <img src={logo} className="phidippides-logo" alt="logo" />
          <Typography
            variant="h1"
            className="appTitle"
            sx={{ fontSize: "10vh" }}
          >
            PhidippidesChat
          </Typography>
          <Typography variant="h4" className="appSub" sx={{ fontSize: "4vh" }}>
            Stay informed, get status updates and more!
          </Typography>
          <Buttoned
            url="login"
            text="Open the app"
            style={{
              borderRadius: "30px",
            }}
          />
        </Card>
      </Container>

      <Stack className="privacyTos" direction="row" spacing={2}>
        <Buttoned
          url="privacy"
          text="Privacy Policy"
          style={{
            color: "#00",
            bottom: "5px",
          }}
        />
        {/* <Button href="/privacy" sx={{ bottom: "5px" }}>
          Privacy Policy
        </Button> */}
        <Icon>circle</Icon>
        <Button href="/terms" sx={{ bottom: "5px" }}>
          Terms of Service
        </Button>
      </Stack>
    </div>
  );
}
