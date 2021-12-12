import { Link } from "react-router-dom";
import "../../App.css";
import Notification from "../../components/notification/notification";
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
        <br />
        <Notification message="Invalid email and/or password" notifyType={1} />
        <br />
      </div>
    </>
  );
}
