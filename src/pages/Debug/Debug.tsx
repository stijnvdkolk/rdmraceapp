import { Link } from "react-router-dom";
import '../../App.css';
export default function Debug() {
  return (

    <div id="out" className="App dark background">
        <div className="vh">
        <Link to="/Login">Login</Link>
        <Link to="/SignUp">Signup</Link>
        <Link to="/Invalid">Invalid</Link>
        <Link to="/Chat">Chat</Link>
        <Link to="/Chat/Publiek">Chat/Publiek</Link>
      </div>
    </div>
    );
}
