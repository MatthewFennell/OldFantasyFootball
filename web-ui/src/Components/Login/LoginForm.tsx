import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { login, getUser } from '../../Services/User/UserService';
import { Credentials } from '../../Models/Interfaces/Credentials';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import * as LoginService from '../../Services/CredentialInputService';

interface LoginState {
  username: string;
  passcode: string;
  error: string;
}

class LoginForm extends React.Component<RoutedFormProps<RouteComponentProps>, LoginState> {
	constructor (props: RoutedFormProps<RouteComponentProps>) {
		super(props);
		this.state = {
			username: '',
			passcode: '',
			error: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<LoginState, keyof LoginState>);
	}

  _validate = () => {
  	if (LoginService.emptyFields(this.state.username, this.state.passcode)) {
  		this.setState({ error: 'All fields must be filled in' });
  		return true;
  	} else if (
  		LoginService.invalidUsername(this.state.username) ||
      LoginService.invalidPasscode(this.state.passcode) ||
      LoginService.passcodeTooShort(this.state.passcode)
  	) {
  		this.setState({ error: 'Username or Passcode not recognised' });
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
  						email: response.email,
  						username: response.username,
  						remainingBudget: response.remainingBudget,
  						roles: response.roles,
  						teamName: response.teamName
  					});
  					this.props.setUserBeingViewed(response.id);
  				})
  				.then(() => {
  					this.props.history.push('/team');
  				})
  				.catch(error => {
  					this.setState({ error: LoginService.formatError(error.toString()) });
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
  			onSubmit={e => e.preventDefault()}
  		>
  			<Form id="login-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Hi there!
  				</h1>
  				<div id="login-input-fields">
  					<Label className="error-text">{this.state.error}</Label>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="username"
  						>
                Username
  						</Label>
  						<Field
  							component="input"
  							id="username"
  							name="username"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="passcode"
  						>
                Passcode
  						</Label>
  						<Field
  							component="input"
  							id="passcode"
  							name="passcode"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
  							type="password"
  						/>
  					</FormGroup>
  				</div>
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
