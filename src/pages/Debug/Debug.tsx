import { Link } from "react-router-dom";
import '../../App.css';
import Notification from "../../components/notification/notification";
export default function Debug() {
  return (

    <div id="out" className="App dark background">
        <div className="vh">
        <Link to="/Login">Login</Link>
        <Link to="/SignUp">Signup</Link>
        <Link to="/Invalid">Invalid</Link>
        <Link to="/Chat">Chat</Link>
        <Link to="/Chat/Publiek">Chat/Publiek</Link>
        <Link to="/Admin">Admin</Link>
        <Notification message="Invalid email and/or password" notifyType={1}/>
      </div>
    </div>
    );
}
