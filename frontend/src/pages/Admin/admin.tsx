//import Background from "../../components/backgrounds/background";
import { Avatar, Button, Card } from "@mui/material";
import "../Admin/admin.css";
import NavDrawer from "../../components/navdrawer/navdrawer";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import NavListItem from "../../components/navListItem/navListItem";
import { useHistory } from "react-router-dom";
import AdminList from "../../components/adminList/adminList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { green, grey, red, yellow } from "@mui/material/colors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Person from "../../classes/Person";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getPeople, getSelf } from "../../API/Chat";
import Pfp from "../../classes/profilePicture";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import InviteList from "../../components/inviteList/inviteList";

export default function Admin() {
  let history = useHistory();
  function redirectTo(id: string) {
    history.push("/Admin/" + id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [self, setSelf] = useState<Person | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsLoaded, setSelf, () => {
      return getSelf();
    });
  }, []);

  const [page, setPage] = useState<Number>(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<any>(null);
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [contacts, setcontacts] = useState<Person[] | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsCLoaded, setcontacts, () => {
      return getPeople(1);
    });
  }, []);

  const [displayUsers, setDisplayUsers] = useState<boolean>(true);

  return (
    <>
      {self && (
        <div className="Admin">
          <div className="options">
            <Card
              style={{
                width: "65vw",
                height: "90vh",
                borderRadius: "16px",
                marginTop: "43px",
                marginRight: "10px",
                marginLeft: "0vw",
              }}
            >
              <h2 style={{ paddingLeft: "5%" }}>
                {/*<AccountCircleIcon />*/}
                <Button variant="text" onClick={() => history.push("/chat")}>
                  <ArrowBackOutlinedIcon />
                  back
                </Button>
                <Button onClick={() => setDisplayUsers(true)}>Users</Button>
                <Button onClick={() => setDisplayUsers(false)}>
                  Invite links
                </Button>
                {displayUsers ? null : (
                  <Button
                    variant="contained"
                    sx={{
                      float: "right",
                      marginRight: "5%",
                    }}
                  >
                    create invite
                  </Button>
                )}
              </h2>
              <Divider variant="middle" />
              {displayUsers ? <AdminList /> : <InviteList />}
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
