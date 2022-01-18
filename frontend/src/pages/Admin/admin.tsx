//import Background from "../../components/backgrounds/background";
import { Button, Card, Popover } from "@mui/material";
import "../Admin/admin.css";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { useHistory } from "react-router-dom";
import AdminList from "../../components/adminList/adminList";
import Person from "../../classes/Person";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getPeople, getSelf } from "../../API/Chat";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import InviteList from "../../components/inviteList/inviteList";
import CreateInvite from "../../components/CreateInvite/CreateInvite";
import React from "react";

export default function Admin() {
  let history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [self, setSelf] = useState<Person | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsLoaded, setSelf, () => {
      return getSelf();
    });
  }, []);


  const [displayUsers, setDisplayUsers] = useState<boolean>(true);
  const [createOn, setcreateOn] = useState(null);
  const handlecreateClick = (event: any) => {
    setcreateOn(event.currentTarget);
  };

  const handlecreateClose = () => {
    setcreateOn(null);
  };
  const createOpen = Boolean(createOn);
  const createId = createOpen ? "simple-popover" : undefined;

  return (
    <>
      {self && self.role === "ADMIN" && (
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
                <div>
                  <Button variant="text" onClick={() => history.push("/chat")}>
                    <ArrowBackOutlinedIcon />
                    back
                  </Button>
                  <Button onClick={() => setDisplayUsers(true)}>Users</Button>
                  <Button onClick={() => setDisplayUsers(false)}>
                    Invite links
                  </Button>
                  {displayUsers ? null : (
                    <>
                      <Button
                        variant="contained"
                        onClick={handlecreateClick}
                        sx={{
                          float: "right",
                          marginRight: "5%",
                        }}
                      >
                        Create invite
                      </Button>
                      <Popover
                        id={createId}
                        open={createOpen}
                        anchorEl={createOn}
                        onClose={handlecreateClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <CreateInvite />
                      </Popover>
                    </>
                  )}
                </div>
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
