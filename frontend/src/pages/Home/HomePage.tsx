import IProps from '../../components/IProps';
import logo from './images/Small Logo.svg';
import './HomePage.css';
import Circle from '@mui/icons-material/Circle';
import Buttoned from '../../components/button/button';
import { Container, Typography, Stack, Card } from '@mui/material';
import Background from '../../components/backgrounds/background';
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

          width: '90%',
        }}
      >
        <div className="DMT">
          <Background />
        </div>

        <Card
          className="homepageBox"
          sx={{
            marginTop: 0,
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 0,
          }}
        >
          <img src={logo} className="phidippides-logo" alt="logo" />
          <Typography
            variant="h1"
            className="appTitle"
            sx={{ fontSize: '50px' }}
          >
            PhidippidesChat
          </Typography>
          <Typography variant="h4" className="appSub" sx={{ fontSize: '40px' }}>
            Stay informed, get status updates and more!
          </Typography>
          <Buttoned
            url="login"
            text="Open the app"
            style={{
              borderRadius: '30px',
            }}
          />
        </Card>
      </Container>

      <Stack className="privacyTos" direction="row" spacing={2}>
        <Buttoned
          url="Privacy"
          text="Privacy Policy"
          style={{
            color: '#00',
            bottom: '5px',
          }}
        />
        {/* <Button href="/privacy" sx={{ bottom: "5px" }}>
          Privacy Policy
        </Button> */}
        <Circle />
        <Buttoned
          url="terms"
          text="Terms of Service"
          style={{
            color: '#00',
            bottom: '5px',
          }}
        />
      </Stack>
    </div>
  );
}
