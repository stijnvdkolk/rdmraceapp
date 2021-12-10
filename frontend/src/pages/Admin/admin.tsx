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

export default function Admin() {
  let history = useHistory();
  function redirectTo(id: number) {
    history.push("/Admin/" + id);
    console.log("Redirect to: " + id);
  }

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<Person[] | undefined>(undefined); //Person[]
  useEffect(() => {
    fetch("https://test20211213170850.azurewebsites.net/testing") // Debug
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<any>(null);
  const [isCLoaded, setIsCLoaded] = useState<boolean>(false);
  const [contacts, setcontacts] = useState<Person[] | undefined>(undefined); //Person[]
  useEffect(() => {
    fetch("https://test20211213170850.azurewebsites.net/getPeople/5") // Debug
      .then((res) => res.json())
      .then(
        (result) => {
          setIsCLoaded(true);
          setcontacts(result);
        },
        (error) => {
          setIsCLoaded(true);
          setError(error);
        }
      );
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
                    text={contact.name}
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