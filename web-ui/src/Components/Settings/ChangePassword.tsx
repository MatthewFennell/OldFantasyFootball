import * as React from 'react';
import { Button } from 'reactstrap';
import TextInputForm from '../common/TexInputForm';
import '../../Style/Settings/ChangePassword.css';
import { patchPassword } from '../../Services/User/UserService';
import { PatchPassword } from '../../Models/Interfaces/PatchPassword';
import ResponseMessage from '../common/ResponseMessage';

interface ChangePasswordProps {
}

interface ChangePasswordState {

	responseMessage: string;
	isError: boolean;

  originalPassword: string;
  newPasswordOne: string;
  newPasswordTwo: string;
}

class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {
	constructor (props: ChangePasswordProps) {
		super(props);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this._handleOriginalPassword = this._handleOriginalPassword.bind(this);
		this._handlePasswordOne = this._handlePasswordOne.bind(this);
		this._handlePasswordTwo = this._handlePasswordTwo.bind(this);
		this.state = {
			originalPassword: '',
			newPasswordOne: '',
			newPasswordTwo: '',
			responseMessage: '',
			isError: false
		};
	}

	_handleOriginalPassword (originalPassword: string) {
		this.setState({ originalPassword });
	}

	_handlePasswordOne (newPasswordOne: string) {
		this.setState({ newPasswordOne });
	}

	_handlePasswordTwo (newPasswordTwo: string) {
		this.setState({ newPasswordTwo });
	}

	handleValidate () {
		this._onSubmit();
	}

	_onSubmit () {
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
				.catch(() => {
					this.setState({ isError: true, responseMessage: 'Incorrect password' });
				});
		} else {
			console.log("passwords don't match");
		}
	}

	render () {
		const { originalPassword, newPasswordOne, newPasswordTwo } = this.state;
		return (
			<div className="password-form">
				<div className="password-form-row-one">
					<TextInputForm
						currentValue={originalPassword}
						password
						setValue={this._handleOriginalPassword}
						title="Current password"
					/>

					<TextInputForm
						currentValue={newPasswordOne}
						password
						setValue={this._handlePasswordOne}
						title="New password"
					/>

					<TextInputForm
						currentValue={newPasswordTwo}
						password
						setValue={this._handlePasswordTwo}
						title="Please repeat your new password"
					/>
				</div>
				<div className="password-form-row-two">
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnChangePassword"
							onClick={this.handleValidate}
						>
              			Submit
						</Button>
						<ResponseMessage
							isError={this.state.isError}
							responseMessage={this.state.responseMessage}
							shouldDisplay={this.state.responseMessage.length > 0}
						/>
					</div>
				</div>

			</div>
		);
	}
}
export default ChangePassword;
