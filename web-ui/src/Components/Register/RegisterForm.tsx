/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Button, FormGroup, Form, Label } from 'reactstrap';
import { register, login, getUser } from '../../Services/User/UserService';
import { RegistrationDetails } from '../../Models/Interfaces/RegistrationDetails';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as RegisterService from '../../Services/CredentialInputService';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import ResponseMessage from '../../Components/common/ResponseMessage';
import classnames from 'classnames';
import '../../Style/RegisterForm.css';

interface RegisterState {
  firstName: string;
  surname: string;
  username: string;
  passcode: string;
	error: string;
	keycode: string;
	isError: boolean;
}

class RegisterForm extends React.Component<RoutedFormProps<RouteComponentProps>, RegisterState> {
	constructor (props: RoutedFormProps<RouteComponentProps>) {
		super(props);
		this.state = {
			firstName: '',
			surname: '',
			username: '',
			passcode: '',
			error: '',
			keycode: '',
			isError: false
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

  _validate = () => {
  	this.setState({ error: '' });
  	if (
  		RegisterService.emptyFields(
  		)
  	) {
  		this.setState({ error: 'All fields must be filled in', isError: true });
  		return true;
  	} else if (
  		RegisterService.invalidName(this.state.firstName) ||
      RegisterService.invalidName(this.state.surname)
  	) {
  		this.setState({ error: 'Invalid characters in name or surname', isError: true });
  		return true;
  	} else if (RegisterService.invalidUsername(this.state.username)) {
  		this.setState({ error: 'Invalid username - must contain only alphanumeric characters', isError: true });
  		return true;
  	} else if (RegisterService.invalidPasscode(this.state.passcode)) {
  		this.setState({ error: 'Invalid password - password must be between 6 and 31 characters, including at least 1 number', isError: true });
  		return true;
  	} else if (RegisterService.passcodeTooShort(this.state.passcode)) {
  		this.setState({ error: 'Passcode is too short', isError: true });
  		return true;
  	}
  	return false;
  };

  _handleInput (eventName: any, eventTarget: HTMLInputElement) {
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
  				username: this.state.username,
  				password: this.state.passcode,
  				keycode: this.state.keycode
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
  						username: response.username,
  						remainingBudget: response.remainingBudget,
  						teamName: response.teamName
  					});
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
  				<div
  					className="signup"
  				>
            Collingwood Sign Up
  				</div>
  			<div className="register-error-message">
  					<ResponseMessage
  						isError={this.state.isError}
  						responseMessage={this.state.error}
  						shouldDisplay
  					/>
  			</div>
  			<div>
  			<Form
  				id="register-form"
  				onSubmit={(e:any) => e.preventDefault()}
  			>

  				<div className={classnames({
  						registerFormWrapper: this.state.error.includes('between'),
  					})}
  				>
  					<FormGroup className="first-name">
  						<Label
  							className="register-label"
  								for="firstName"
  								id="firstNameLabel"
  						>
                First name
  						</Label>
  						<Field
  							component="input"
  							id="firstName"
  							name="firstName"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  					<FormGroup className="surname">
  						<Label
  							className="register-label"
  								for="surname"
  								id="surnameLabel"
  						>
                Surname
  						</Label>
  						<Field
  							component="input"
  							id="surname"
  							name="surname"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  					<FormGroup className="username">
  						<Label
  							className="register-label"
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
  					<FormGroup className="passcode">
  						<Label
  							className="register-label"
  								for="passcode"
  								id="passcodeLabel"
  						>
                Passcode
  						</Label>
  						<Field
  							component="input"
  							id="passcode"
  							name="passcode"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="password"
  						/>
  						</FormGroup>
  						<FormGroup>
  						<Label
  							className="register-label"
  							for="keycode"
  							id="keycodeLabel"
  						>
                Keycode
  						</Label>
  						<Field
  							component="input"
  							id="keycode"
  							name="keycode"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
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
  		</div>
  	);
  }
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'register'
	})(RegisterForm)
);
