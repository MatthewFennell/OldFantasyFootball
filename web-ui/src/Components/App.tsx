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
	render () {
		console.log('logged in = ' + isLoggedIn());
		return (
			<React.Fragment>
				<Header />
				<Switch>
					<Route
						component={() => (isLoggedIn ? <Redirect to="/team" /> : <Redirect to="/login" />)}
						exact
						path="/"
					/>
					<Route
						component={Login}
						exact
						path="/login"
					/>
					<Route
						component={Register}
						exact
						path="/register"
					/>
					<Route
						component={SplashScreen}
						exact
						path="/splashScreen"
					/>
					{/* <Route exact path="/team" component={Team} /> */}
					{/* <Route exact path="/transfers" component={Transfers} /> */}
					<Route
						component={Leagues}
						exact
						path="/leagues"
					/>
					<Route
						component={Admin}
						exact
						path="/admin"
					/>
					<Route
						component={Settings}
						exact
						path="/settings"
					/>
					<PageBody />
				</Switch>
			</React.Fragment>
		);
	}
}
export default App;
