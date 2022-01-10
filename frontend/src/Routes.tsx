import { Route, Switch } from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Chat from './pages/Chat/Chat';
import Debug from "./pages/Debug/Debug";
import Admin from "./pages/Admin/admin";
import Invalid from "./pages/Invalid/invalid";
import IProps from "./components/IProps";

export default function Routes(props :IProps) {
    return (
        <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Chat/:channelID" component={Chat} />
            <Route path="/Chat/" component={Chat} />
            <Route path="/Invalid/" component={Invalid} /> 
            <Route path="/Admin/:PersonID" component={Admin} /> 
            <Route path="/Admin/" component={Admin} /> 
            <Route path="/" component={Debug} /> 
        </Switch> 
    )
}
