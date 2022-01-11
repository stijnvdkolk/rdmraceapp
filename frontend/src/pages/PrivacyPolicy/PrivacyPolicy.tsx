import IProps from '../../components/IProps';

import './PrivacyPolicy.css';
import { Container, Typography, Card } from '@mui/material';
import Background from '../../components/backgrounds/background';
//comment
export default function PrivacyPolicy(props: IProps) {
  return (
    /*Background*/
    <div className="PrivacyPolicyContainer">
      <Container
        className="PrivacyPolicyContainerDEBUG"
        sx={{
          height: '100%',
          width: '90%',
        }}
      >
        <div className="DMT">
          <Background />
        </div>

        <Card
          className="PrivacyPolicyBox"
          sx={{
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'scroll',
          }}
        >
          <Typography
            variant="h1"
            className="appTitle"
            sx={{ fontSize: '10vh' }}
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: '4vh' }}
          >
            Bij PhidippidesChat, toegankelijk via link.nl, is een van onze
            belangrijkste prioriteiten de privacy van onze bezoekers. Deze
            Privacybeleid-page bevat soorten informatie die wordt verzameld en
            vastgelegd door PhidippidesChat en hoe we deze gebruiken. Als u nog
            vragen heeft of meer informatie wenst over ons privacybeleid, aarzel
            dan niet om contact met ons op te nemen. Dit privacybeleid is alleen
            van toepassing op onze online activiteiten en is geldig voor
            bezoekers van onze website met betrekking tot de informatie die ze
            hebben gedeeld en/of verzameld in PhidippidesChat.
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: '10vh' }}
          >
            Toestemming
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: '4vh' }}
          >
            Door onze website te gebruiken, stemt u hierbij in met ons
            privacybeleid en gaat u akkoord met de voorwaarden ervan.
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: '10vh' }}
          >
            Hoe wij uw informatie gebruiken
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: '4vh' }}
          >
            We gebruiken de informatie die we verzamelen op verschillende
            manieren, waaronder: Onze website aanbieden, beheren en onderhouden.
            Onze website verbeteren. Met u communiceren, om u updates en andere
            informatie met betrekking tot de website te verstrekken en om mails
            te sturen.
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: '10vh' }}
          >
            Informatie die we verzamelen
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: '4vh' }}
          >
            De persoonlijke informatie die u wordt gevraagd te verstrekken, en
            de redenen waarom u wordt gevraagd om deze te verstrekken, zullen u
            duidelijk worden gemaakt op het moment dat wij u vragen om uw
            persoonlijke informatie te verstrekken. Als u rechtstreeks contact
            met ons opneemt, kunnen we aanvullende informatie over u ontvangen,
            zoals uw naam, e-mailadres, telefoonnummer, de inhoud van het
            bericht en/of de bijlagen die u ons stuurt, en alle andere
            informatie die u mogelijk wilt verstrekken. Wanneer u zich
            registreert voor een Account, kunnen we om uw contactgegevens
            vragen, inclusief items zoals naam en e-mailadres.
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: '10vh' }}
          >
            Bewaartermijnen
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: '4vh' }}
          >
            Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk is om
            de in deze privacy- en cookieverklaring genoemde doeleinden te
            bereiken.
          </Typography>

          <Typography
            variant="h6"
            className="subTitle"
            sx={{ fontSize: '10vh' }}
          >
            Gegevensbeveiliging
          </Typography>
          <Typography
            variant="body1"
            className="appBody"
            sx={{ fontSize: '4vh' }}
          >
            PhidippidesChat maakt gebruik van zorgvuldige veiligheidsprocedures
            voor de bescherming van de verwerkte gegevens, onder meer om te
            voorkomen dat onbevoegden zich onbedoeld toegang kunnen verschaffen
            tot deze gegevens. Zo zorgen wij dat alleen de noodzakelijke
            personen toegang hebben tot uw gegevens en dat de toegang tot uw
            persoonsgegevens afgeschermd is.
          </Typography>
        </Card>
      </Container>
    </div>
  );
}
