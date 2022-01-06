//import Background from "../../components/backgrounds/background";
import { Avatar, Card } from "@mui/material";
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

export default function Admin() {
  let history = useHistory();
  function redirectTo(id: string) {
    history.push("/Admin/" + id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<Person[] | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsLoaded, setItems, () => {return getSelf();} );
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<any>(null);
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [contacts, setcontacts] = useState<Person[] | undefined>(undefined); //Person[]
  useEffect(() => {
    ConsumeEffect(setIsCLoaded, setcontacts, () => {return getPeople(5);} );
  }, []);

  return (
    <>
      <div className="Admin">
        <div className="Drawer">
          <NavDrawer
            mischellaneous={true}
            name={"Admin"}
            imageLink={
              "https://raymanpc.com/wiki/script-en/images/1/15/Admin.png"
            }
          >
            {isCLoaded && contacts != null ? (
              <div>
                <Divider />
                {contacts.map((contact) => (
                  <NavListItem
                    key={contact.id}
                    text={contact.username}
                    onClickCommand={() => {
                      redirectTo(contact.id!);
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{
                        color:
                          contact.status === "Online"
                            ? green[500]
                            : contact.status === "Away"
                            ? yellow[500]
                            : contact.status === "Do not Disturb"
                            ? red[500]
                            : grey[500],
                        order: 2,
                        marginLeft: "-20px",
                        marginTop: "25px",
                        position: "relative",
                      }}
                    />
                    <Avatar
                      alt=""
                      src={contact.profilePicture}
                      sx={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </NavListItem>
                ))}
              </div>
            ) : (
              <div />
            )}
          </NavDrawer>
        </div>
        <div className="options">
          <Card
            style={{
              width: "65vw",
              height: "90vh",
              borderRadius: "16px",
              marginTop: "43px",
              marginRight: "10px",
              marginLeft: "25vw",
            }}
          >
            <h2 style={{ paddingLeft: "5%" }}>
              <AccountCircleIcon />
              Users
            </h2>
            <Divider variant="middle" />
            <AdminList />
          </Card>
        </div>
      </div>
    </>
  );
}
