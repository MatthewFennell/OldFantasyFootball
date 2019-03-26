/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Button, FormGroup, Form, Label } from 'reactstrap';
import { register, login, getUser } from '../../Services/User/UserService';
import { RegistrationDetails } from '../../Models/Interfaces/RegistrationDetails';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as RegisterService from '../../Services/CredentialInputService';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';

interface RegisterState {
  firstName: string;
  surname: string;
  email: string;
  username: string;
  passcode: string;
  error: string;
}

class RegisterForm extends React.Component<RoutedFormProps<RouteComponentProps>, RegisterState> {
	constructor (props: RoutedFormProps<RouteComponentProps>) {
		super(props);
		this.state = {
			firstName: '',
			surname: '',
			email: '',
			username: '',
			passcode: '',
			error: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

  _validate = () => {
  	this.setState({ error: '' });
  	if (
  		RegisterService.emptyFields(
  			this.state.firstName,
  			this.state.surname,
  			this.state.email,
  			this.state.username,
  			this.state.passcode
  		)
  	) {
  		this.setState({ error: 'All fields must be filled in' });
  		return true;
  	} else if (
  		RegisterService.invalidName(this.state.firstName) ||
      RegisterService.invalidName(this.state.surname)
  	) {
  		this.setState({ error: 'Invalid characters in name or surname' });
  		return true;
  	} else if (RegisterService.invalidEmail(this.state.email)) {
  		this.setState({ error: 'Invalid email entered' });
  		return true;
  	} else if (RegisterService.invalidUsername(this.state.username)) {
  		this.setState({ error: 'Invalid username - must contain only alphanumeric characters' });
  		return true;
  	} else if (RegisterService.invalidPasscode(this.state.passcode)) {
  		this.setState({ error: 'Invalid passcode - passcode must be 6 digits' });
  		return true;
  	} else if (RegisterService.passcodeTooShort(this.state.passcode)) {
  		this.setState({ error: 'Passcode is too short' });
  		return true;
  	}
  	return false;
  };

  _handleInput (eventName: string, eventTarget: HTMLInputElement) {
  	this.setState({
  		[eventName]: eventTarget.value
  	} as Pick<RegisterState, keyof RegisterState>);
  }

  _onSubmit = (event: string) => {
  	switch (event) {
  	case 'btnRegister':
  		const err = this._validate();
  		if (!err) {
  			const data: RegistrationDetails = {
  				firstName: this.state.firstName,
  				surname: this.state.surname,
  				email: this.state.email,
  				username: this.state.username,
  				password: this.state.passcode
  			};
  			register(data)
  				.then(() => (this.state.error === '' ? login(data) : Promise.reject(this.state.error)))
  				.then(response => {
  					RegisterService.setTokens(response);
  				})
  				.then(() => getUser())
  				.then(response => {
  					this.props.setAccount({
  						id: response.id,
  						firstName: response.firstName,
  						surname: response.surname,
  						email: response.email,
  						username: response.username,
  						totalPoints: response.totalPoints,
  						remainingBudget: response.remainingBudget,
  						roles: response.roles
  					});
  					this.props.setRemainingBudget(response.remainingBudget);
  					this.props.setUserBeingViewed(response.id);
  				})
  				.then(() => {
  					this.props.history.push('/team');
  				})
  				.catch(error => {
  					this.setState({ error: RegisterService.formatError(error.toString()) });
  				});
  		}
  		break;
  	case 'btnLogin':
  		this.props.history.push('/login', { animate: true });
  		break;
  	default:
  		break;
  	}
  };

  render () {
  	return (
  		<div id="register-form">
  			<Form
  				id="register-form"
  				onSubmit={e => e.preventDefault()}
  			>
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Sign Up:
  				</h1>
  				<Label className="error-text">{this.state.error}</Label>
  				<div id="register-input-fields">
  					<FormGroup className="first-name">
  						<Label
  							className="unselectable"
  							for="firstName"
  						>
                First name
  						</Label>
  						<Field
  							component="input"
  							id="firstName"
  							name="firstName"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  					<FormGroup className="surname">
  						<Label
  							className="unselectable"
  							for="surname"
  						>
                Surname
  						</Label>
  						<Field
  							component="input"
  							id="surname"
  							name="surname"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  					<FormGroup className="email">
  						<Label
  							className="unselectable"
  							for="email"
  						>
                Email
  						</Label>
  						<Field
  							component="input"
  							id="email"
  							name="email"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  					<FormGroup className="username">
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
  					<FormGroup className="passcode">
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
  					id="btnRegister"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  					type="submit"
  				>
            Sign up
  				</Button>
  				<Button
  					className="btn btn-default btn-round-lg btn-lg second"
  					id="btnLogin"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  				>
            Log in
  				</Button>
  			</Form>
  		</div>
  	);
  }
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'register'
	})(RegisterForm)
);
