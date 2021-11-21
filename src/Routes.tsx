import { Route, Switch } from "react-router-dom";

import App from "./App";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Chat from './pages/Chat/Chat';

export default function Routes() {
    return (
        <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Chat/:channelID" component={Chat} />
            <Route path="/Chat/" component={Chat} />
            <Route path="/" component={App} />
        </Switch> 
    )
}