import { FiberManualRecord } from "@mui/icons-material";
import { Card, CircularProgress, Divider } from "@mui/material";
import react, { useEffect, useState } from "react";
import { ConsumeEffect } from "../../API/ApiCalls";
import { getSelf, getPerson } from "../../API/Chat";
import Person from "../../classes/Person";
import Pfp from "../../classes/profilePicture";
import Buttoned from "../button/button";
import "./userProfile.css";
import IProps from "../IProps";

interface ProfileProps extends IProps {
  bigprofile: boolean;
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function UserProfile(props: ProfileProps) {
  const { bigprofile } = props;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selfProfile, setselfProfile] = useState<Person | undefined>(undefined); //Person
  useEffect(() => {
    ConsumeEffect(setIsLoaded, setselfProfile, () => {
      return getPerson("cky4di5vq00030tly1g5ovww6");
    });
  }, []);

  return (
    <Card
      className={bigprofile ? "GridParent" : "GridParentSmall"}
      sx={{
        width: bigprofile ? "500px" : "270px",
        height: bigprofile ? "500px" : "350px",
        borderRadius: "16px",
      }}
    >
      {isLoaded ? (
        <>
          {selfProfile ? (
            <>
              <div className="ProfEnStatus">
                <img
                  className={bigprofile ? "profPic" : "profPicSmall"}
                  alt={selfProfile.username}
                  src={Pfp(selfProfile.id!, selfProfile.profilePicture!)}
                />
                <div
                  className="status"
                  style={{
                    backgroundColor:
                      selfProfile.status === "ONLINE" ? "lime" : "grey",
                    width: bigprofile ? "35px" : "25px",
                    height: bigprofile ? "35px" : "25px",
                    borderRadius: "20px",
                    marginTop: bigprofile ? "65px" : "55px",
                    marginLeft: "-100%",
                  }}
                />
                <Buttoned
                  className="dm"
                  url="#"
                  text={`message ${selfProfile.username}`}
                  style={{ borderRadius: "16px", marginTop: "35px" }}
                />
              </div>
              <div className="name">
                <h3>{selfProfile.username}</h3>
              </div>
              <div className="divide">
                <Divider />
              </div>
              <div className="bio">
                <h3>About me</h3>
                {selfProfile.aboutMe}
              </div>
              <div className="role">
                <h3>Roles</h3>
                <b>{toTitleCase(selfProfile.role!)}</b>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
    </Card>
  );
}
