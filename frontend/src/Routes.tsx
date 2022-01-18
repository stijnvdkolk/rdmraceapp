import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Chat from './pages/Chat/Chat';
import Debug from './pages/Debug/Debug';
import Admin from './pages/Admin/admin';
import Invalid from './pages/Invalid/invalid';
import IProps from './components/IProps';
import HomePage from './pages/Home/HomePage';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import EditProfile from './pages/EditProfile/EditProfile';
import InviteWindow from './pages/inviteLink/invite';

export default function Routes(props: IProps) {
  return (
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/SignUp/:Code" component={SignUp} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Invite/:Code" component={InviteWindow} />
      <Route path="/Invite" component={InviteWindow} />
      <Route path="/Privacy" component={PrivacyPolicy} />
      <Route path="/Terms" component={TermsOfService} />
      <Route path="/TermsOfService" component={TermsOfService} />
      <Route path="/Tos" component={TermsOfService} />
      <Route path="/Chat/:channelID" component={Chat} />
      <Route path="/Chat/" component={Chat} />
      <Route path="/Editprofile/:personID/" component={EditProfile} />
      <Route path="/Editprofile" component={EditProfile} />
      <Route path="/Invalid/" component={Invalid} />
      <Route path="/Admin/:PersonID" component={Admin} />
      <Route path="/Admin/" component={Admin} />
      <Route path="/Debug" component={Debug} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
}
