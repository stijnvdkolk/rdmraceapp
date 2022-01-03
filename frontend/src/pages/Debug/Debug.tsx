import { Link } from "react-router-dom";
import "../../App.css";
import Notification from "../../components/notification/notification";
import Button from "@mui/material/Button";
export default function Debug() {
  return (
    <>
      <div className="vh">
        <Link to="/Login">Login</Link>
        <Link to="/SignUp">Signup</Link>
        <Link to="/Invalid">Invalid</Link>
        <Link to="/Chat">Chat</Link>
        <Link to="/Chat/Publiek">Chat/Publiek</Link>
        <Link to="/Admin">Admin</Link>
        <Notification message="Invalid email and/or password" />
      </div>
    </>
  );
}
