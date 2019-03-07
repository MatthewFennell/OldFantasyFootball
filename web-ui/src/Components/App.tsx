import * as React from 'react';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import { isLoggedIn } from '../Services/CredentialInputService';
import { Redirect, Route, Switch } from 'react-router-dom';
import SplashScreen from './Reusable/SplashScreen';
import Header from '../Containers/Header';
import '../Style/App.css';
import PageBody from '../Containers/PageBody';
// import Transfers from '../Containers/Transfers/Transfers';
// import Team from '../Containers/Team/Team';
import Leagues from '../Containers/League/Leagues';
import Admin from '../Containers/Admin/Admin';
import Settings from '../Components/Settings/Settings';

class App extends React.Component {
  render() {
    console.log('logged in = ' + isLoggedIn());
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (isLoggedIn ? <Redirect to="/team" /> : <Redirect to="/login" />)}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/splashScreen" component={SplashScreen} />
          {/* <Route exact path="/team" component={Team} /> */}
          {/* <Route exact path="/transfers" component={Transfers} /> */}
          <Route exact path="/leagues" component={Leagues} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/settings" component={Settings} />
          <PageBody />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
