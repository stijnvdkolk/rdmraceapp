import { Link } from "react-router-dom";
import "../../App.css";
import Notification from "../../components/notification/notification";
import Button from "@mui/material/Button";
import UserProfile from "../../components/userProfile/userProfile";
export default function Debug() {
  return (
    <>
      <div className="vh">
        <Link to="/Login">Login</Link>
        <br />
        <Link to="/SignUp">Signup</Link>
        <br />
        <Link to="/Invalid">Invalid</Link>
        <br />
        <Link to="/Homepage">HomeisWhereTheHeartIs</Link>
        <br />
        <Link to="/Chat">Chat</Link>
        <br />
        <Link to="/Chat/Publiek">Chat/Publiek</Link>
        <br />
        <Link to="/Admin">Admin</Link>
        <UserProfile bigprofile={false} />
      </div>
    </>
  );
}
