import * as React from 'react';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import { isLoggedIn } from '../Services/CredentialInputService';
import { Redirect, Route, Switch } from 'react-router-dom';
import SplashScreen from './Reusable/SplashScreen';
import Header from '../Containers/Header';
import '../Style/App.css';
import PageBody from '../Containers/PageBody';
import Leagues from '../Containers/League/Leagues';
import Admin from '../Containers/Admin/Admin';
import Settings from '../Containers/Settings/Settings';
import Transfers from '../Containers/Transfers/Transfers';
import Stats from '../Containers/Stats/Stats';
import Captain from '../Containers/Captain/Captain';

const App: React.SFC = (props) => {
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
				<Route
					component={Leagues}
					exact
					path="/leagues"
				/>
				<Route
					component={Transfers}
					exact
					path="/transfers"
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
				<Route
					component={Captain}
					exact
					path="/captain"
				/>
				<Route
					component={Stats}
					exact
					path="/stats"
				/>
				<PageBody />
			</Switch>
		</React.Fragment>
	);
};
export default App;
