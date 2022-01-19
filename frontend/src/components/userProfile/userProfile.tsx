import { Button, Card, CircularProgress, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { ConsumeEffect } from '../../API/ApiCalls';
import Person from '../../classes/Person';
import Pfp from '../../classes/profilePicture';
import './userProfile.css';
import IProps from '../IProps';
import EditIcon from '@mui/icons-material/Edit';
import { getPerson, getSelf, MakeDM } from '../../API/Chat';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
//import { Logout } from "../../Logout";

interface ProfileProps extends IProps {
  bigprofile: boolean;
  functieArg?: string | undefined;
  self: boolean;
  onClick?: () => void;
}

function Logout() {
  localStorage.removeItem('DogeToken');
  window.location.reload();
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function UserProfile(props: ProfileProps) {
  const { bigprofile } = props;
  const { functieArg } = props;
  const { self } = props;
  const { onClick } = props;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selfProfile, setselfProfile] = useState<Person | undefined>(undefined); //Person
  const [meProfile, setMeProfile] = useState<Person | undefined>(undefined); //Person
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [meLoaded, setMeLoaded] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [OwnProfile, setOwnProfile] = useState<boolean>(false);

  const logout = () => {
    Logout();
  };

  useEffect(() => {
    if (self) {
      setOwnProfile(true);
      ConsumeEffect(setIsLoaded, setselfProfile, () => {
        return getSelf();
      });
    } else {
      setOwnProfile(true);
      ConsumeEffect(setMeLoaded, setMeProfile, () => {
        return getSelf();
      });
      ConsumeEffect(setIsLoaded, setselfProfile, () => {
        return getPerson(functieArg!);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [functieArg]);
  useEffect(() => {
    if (!self) {
      if (isLoaded) {
        if (meProfile?.id === functieArg) {
          setOwnProfile(true);
        } else {
          setOwnProfile(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meProfile]);
  let history = useHistory();
  async function makeDmAndYeet() {
    if (meProfile?.id !== functieArg && !self) {
      await MakeDM(functieArg!).then((res) => {
        if (onClick) {
          onClick();
        }
        history.push(`/chat/${res.id!}`);
      });
    }
  }

  //TODO: David om te zien of het eigen profiel is, OOK IN CHAT gebruik OwnProfile
  return (
    <Card
      className={bigprofile ? 'GridParent' : 'GridParentSmall'}
      sx={{
        width: bigprofile ? '360px' : '320px',
        height: bigprofile ? '500px' : '375px',
        borderRadius: '16px',
      }}
    >
      {isLoaded ? (
        <>
          {selfProfile ? (
            <>
              <div className="ProfEnStatus">
                <img
                  className={bigprofile ? 'profPic' : 'profPicSmall'}
                  alt={selfProfile.username}
                  src={Pfp(selfProfile.id!, selfProfile.profilePicture!)}
                />
                <div
                  className="status"
                  style={{
                    backgroundColor:
                      selfProfile.status === 'ONLINE' ? 'lime' : 'grey',
                    width: bigprofile ? '35px' : '25px',
                    height: bigprofile ? '35px' : '25px',
                    borderRadius: '20px',
                    marginTop: bigprofile ? '65px' : '55px',
                    marginLeft: '-100%',
                  }}
                />
                {meProfile?.id !== functieArg && !self ? (
                  <Button
                    className="dm"
                    onClick={makeDmAndYeet}
                    variant="contained"
                    sx={{
                      right: '20px',
                      height: '50px',
                      top: '20px',
                      width: '200px',
                    }}
                    endIcon={<SendIcon />}
                  >{`message ${selfProfile.username}`}</Button>
                ) : (
                  <div className="LogoutEdit">
                    <Button
                      onClick={logout}
                      variant="contained"
                      sx={{
                        right: '10px',
                        height: '35px',
                        width: '175px',
                        gridRow: '1',
                      }}
                      endIcon={<LogoutIcon />}
                    >
                      logout
                    </Button>
                    <Button
                      endIcon={<EditIcon />}
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        history.push('/editprofile');
                      }}
                      sx={{
                        right: '10px',
                        height: '35px',
                        marginTop: '3px',
                        width: '175px',
                        gridRow: '2',
                      }}
                    >
                      Edit Profile
                    </Button>
                    {selfProfile.role === 'ADMIN' ? (
                      <Button
                        endIcon={<EditIcon />}
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          history.push('/Admin');
                        }}
                        sx={{
                          right: '10px',
                          height: '35px',
                          marginTop: '3px',
                          width: '175px',
                          gridRow: '3',
                        }}
                      >
                        Admin Page
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
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
