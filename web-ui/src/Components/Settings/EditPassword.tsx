/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import '../../Style/League/League-create.css';
import { Col } from 'react-bootstrap';
import { patchPassword } from '../../Services/User/UserService';
import { PatchPassword } from '../../Models/Interfaces/PatchPassword';
import ResponseMessage from '../common/ResponseMessage';

interface EditPasswordState {
  originalPassword: string;
  responseMessage: string;
  isError: boolean;
  newPasswordOne: string;
  newPasswordTwo: string;
}

interface EditPasswordProps {
}

class EditPassword extends React.Component<
	RoutedFormProps<RouteComponentProps> & EditPasswordProps,
	EditPasswordState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & EditPasswordProps) {
		super(props);
		this.state = {
			originalPassword: '',
			responseMessage: '',
			isError: false,
			newPasswordOne: '',
			newPasswordTwo: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<EditPasswordState, keyof EditPasswordState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
  	switch (event) {
  	case 'btnCreateLeague':
  		const err = this._validate();
  		if (!err) {
  			const { originalPassword, newPasswordOne, newPasswordTwo } = this.state;

  			if (newPasswordOne === newPasswordTwo) {
  				let data: PatchPassword = {
  					originalPassword,
  					newPasswordOne,
  					newPasswordTwo
  				};
  				patchPassword(data).then(response => {
  					this.setState({
  						originalPassword: '',
  						newPasswordOne: '',
  						newPasswordTwo: '',
  						isError: false,
  						responseMessage: 'Password reset correctly'
  					});
  				})
  					.catch(error => {
  						this.setState({ isError: true, responseMessage: error });
  					});
  			} else {
  				this.setState({ isError: true, responseMessage: "Passwords don't match" });
  			}
  		}
  		break;
  	default:
  		break;
  	}
  };

  render () {
  	return (
  		<Col
  			className="league-info-screen"
  			lg={6}
  			md={6}
  			xs={6}
  		>
  		<div
  			className="create-league-form"
  			onSubmit={(e:any) => e.preventDefault()}
  		>
  			<Form id="create-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Change your password!
  				</h1>
  				<div id="login-input-fields">
  					<FormGroup>
  						<Label
  							className="unselectable"
							  for="originalPassword"
							  id="originalPass"
  						>
                		Current Password
  						</Label>
  						<Field
  							component="input"
  							id="originalPassword"
  							name="originalPassword"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="password"
  						/>

  							<Label
							  className="unselectable"
  							for="newPasswordOne"
  							id="newPasswordOneLabel"
  							>
                		New Password
  						</Label>
  						<Field
  							component="input"
  							id="newPasswordOne"
  							name="newPasswordOne"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="password"
  						/>
  							<Label
							  className="unselectable"
  							for="newPasswordTwo"
  							id="newPasswordOneLabel"
  							>
                		Please repeat your new password
  						</Label>
  						<Field
  							component="input"
  							id="newPasswordTwo"
  							name="newPasswordTwo"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="password"
  						/>
  					</FormGroup>
  				</div>
  				<Button
  					className="btn btn-default btn-round-lg btn-lg first"
  					id="btnCreateLeague"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  					type="submit"
  				>
            Submit
  				</Button>
				  <div className="create-league-response-wrapper">
  						<ResponseMessage
  							isError={this.state.isError}
  							responseMessage={this.state.responseMessage}
  							shouldDisplay
  						/>
					  </div>
  			</Form>

  		</div>
		  </Col>
  	);
  }
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'login'
	})(EditPassword)
);
