/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { login, getUser } from '../../Services/User/UserService';
import { Credentials } from '../../Models/Interfaces/Credentials';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import * as LoginService from '../../Services/CredentialInputService';
import ResponseMessage from '../../Components/common/ResponseMessage';
import '../../Style/LoginForm.css';
import { getTeamForUserInWeek, getMostValuableAssets } from '../../Services/Player/PlayerService';
import { Image } from 'react-bootstrap';

interface LoginState {
  username: string;
  passcode: string;
	error: string;
	isError: boolean;

	tryingToLogin: boolean;
}

class LoginForm extends React.Component<RoutedFormProps<RouteComponentProps>, LoginState> {
	constructor (props: RoutedFormProps<RouteComponentProps>) {
		super(props);
		this.state = {
			username: '',
			passcode: '',
			error: '',
			isError: false,
			tryingToLogin: false
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<LoginState, keyof LoginState>);
	}

  _validate = () => {
  	if (LoginService.emptyFields(this.state.username, this.state.passcode)) {
  		this.setState({ error: 'All fields must be filled in', isError: true });
  		return true;
  	} else if (
  		LoginService.invalidUsername(this.state.username) ||
      LoginService.invalidPasscode(this.state.passcode) ||
      LoginService.passcodeTooShort(this.state.passcode)
  	) {
  		this.setState({ error: 'Invalid username or password', isError: true });
  		return true;
  	} else return false;
  };

  _onSubmit = (event: string) => {
  	switch (event) {
  	case 'btnLogin':
  		const err = this._validate();
  		if (!err) {
  			const data: Credentials = {
  				username: this.state.username,
  				password: this.state.passcode
  			};
  			this.setState({ tryingToLogin: true });
  			login(data)
  				.then(function (response) {
  					LoginService.setTokens(response);
  				})
  				.then(() => getUser())
  				.then(response => {
  					this.props.setAccount({
  						id: response.id,
  						firstName: response.firstName,
  						surname: response.surname,
  						username: response.username,
  						remainingBudget: response.remainingBudget,
  						teamName: response.teamName
  					});
  					this.props.setUserBeingViewed(response.id);
  						getTeamForUserInWeek(response.id, -1).then(teamResponse => {
  						this.props.setTeam(response.id, -1, teamResponse);
  						this.props.setOriginalTransferTeam(teamResponse);
  						}).then(() => {
  						getMostValuableAssets(response.id).then(mostValuableResponse => {
  							this.props.setMostValuable(response.id, mostValuableResponse);
  						}).then(() => {
  							this.props.history.push('/team');
  						});
  					});
  				})

  				.catch(error => {
  					this.setState({ error: LoginService.formatError(error.toString()), tryingToLogin: false, isError: true });
  				});
  		}
  		break;
  	case 'btnRegister':
  		this.props.history.push('/register', { animate: true });
  		break;
  	default:
  		break;
  	}
  };

  render () {
  	return (
  		<div
  			id="login-form"
  			onSubmit={(e:any) => e.preventDefault()}
  		>
  			<Form id="login-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Collingwood Footy
  				</h1>
  				<div id="login-input-fields">
  					<div className="login-error-message">
  					<ResponseMessage
  						isError={this.state.isError}
  						responseMessage={this.state.error}
  						shouldDisplay
  					/>
  			</div>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="username"
  							id="usernameLabel"
  						>
                Username
  						</Label>
  						<Field
  							component="input"
  							id="username"
  							name="username"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="passcode"
  							id="passcodeLabel"
  						>
                Password
  						</Label>
  						<Field
  							component="input"
  							id="passcode"
  							name="passcode"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="password"
  						/>
  					</FormGroup>
  				</div>
  				<div className="loading-spinner-wrapper">{this.state.tryingToLogin ? <div className="loading-spinner">
  					<Image
  						alt="Loading Spinner"
  						className="loading-spinner"
  						src="Spinner.svg"
  					/>
  				</div> : null } </div>

  				<Button
  					className="btn btn-default btn-round-lg btn-lg first"
  					id="btnLogin"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  					type="submit"
  				>
            Log In
  				</Button>
  				<Button
  					className="btn btn-default btn-round-lg btn-lg second"
  					id="btnRegister"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  				>
            Sign Up
  				</Button>

  			</Form>

  		</div>
  	);
  }
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'login'
	})(LoginForm)
);
