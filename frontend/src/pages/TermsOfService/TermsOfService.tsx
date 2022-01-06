import IProps from "../../components/IProps";
import React from "react";

import "./TermsOfService.css";
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
export default function TermsOfService(props: IProps) {
  return (
    /*Background*/
    <div className="TermsOfServiceContainer">
      <Container
        className="TermsOfServiceContainerDEBUG"
        sx={{
          height: "100%",
          width: "90%",
        }}
      >
        <div className="DMT">
          <Background />
        </div>

        <Card
          className="TermsOfServiceBox"
          sx={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "scroll",
          }}
        >
          <Typography
            variant="h1"
            className="appTitle"
            sx={{ fontSize: "10vh" }}
          >
            Terms of Service
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: "4vh" }}
          >
            Op deze pagina vindt u de algemene voorwaarden van PhidippidesChat
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: "10vh" }}
          >
            Intellectueel eigendom
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: "4vh" }}
          >
            Zonder uitdrukkelijke schriftelijke toestemming van PhidippidesChat
            is het niet toegestaan tekst, fotomateriaal of andere materialen op
            deze website her te gebruiken.
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: "10vh" }}
          >
            Informatie
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: "4vh" }}
          >
            PhidippidesChat streeft naar een zo actueel mogelijke website. Mocht
            ondanks deze inspanningen de informatie van of de inhoud op
            onvolledig en of onjuist zijn, dan kunnen wij daarvoor geen
            aansprakelijkheid aanvaarden. De informatie en/of producten op deze
            website worden aangeboden zonder enige vorm van garantie en of
            aanspraak op juistheid. Wij behouden ons het recht voor om deze
            materialen te wijzigen, te verwijderen of opnieuw te plaatsen zonder
            enige voorafgaande mededeling. PhidippidesChat aanvaardt geen
            aansprakelijkheid voor enige informatie die op websites staat
            waarnaar wij via hyperlinks verwijzen.
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: "10vh" }}
          >
            Wijzigingen
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: "4vh" }}
          >
            Mochten deze algemene voorwaarden wijzigen, dan vindt u de meest
            recente versie van de disclaimer van PhidippidesChat op deze pagina.
          </Typography>
        </Card>
      </Container>
    </div>
  );
}
