import { FiberManualRecord } from "@mui/icons-material";
import { Card, Divider } from "@mui/material";
import react, { useEffect, useState } from "react";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getSelf } from "../../API/Chat";
import Person from "../../classes/Person";
import "./userProfile.css";

export default function UserProfile() {
  const status = true;
  const big = true; // TODO: change size depending on this value

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selfProfile, setselfProfile] = useState<Person | undefined>(undefined); //Person
  useEffect(() => {
    ConsumeEffect(setIsLoaded, setselfProfile, () => {
      return getSelf();
    });
  }, []);

  return (
    <Card
      className="GridParent"
      sx={{
        width: big ? "35vw" : "18vw",
        height: big ? "70vh" : "50vh",
        borderRadius: "16px",
      }}
    >
      <div className="ProfEnStatus">
        <img
          className="profPic"
          alt=""
          src="https://i.redd.it/v0caqchbtn741.jpg"
        />
        <div
          className="status"
          style={{
            backgroundColor: status ? "lime" : "grey",
            width: "35px",
            height: "35px",
            borderRadius: "20px",
            marginTop: "65px",
            marginLeft: "-100%",
          }}
        />
      </div>
      <div className="name">
        <h3>David van (insert achternaam)</h3>
      </div>
      <div className="divide">
        <Divider />
      </div>
      <div className="bio">
        <h3>About me</h3>Ik ben birb and you are watching the disney channel
      </div>
      <div className="role">
        <h3>Roles</h3>
        <b>Team member</b>
      </div>
    </Card>
  );
}
