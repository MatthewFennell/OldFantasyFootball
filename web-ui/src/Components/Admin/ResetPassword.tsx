import * as React from 'react';
import { Button } from 'reactstrap';
import '../../Style/Admin/ErrorMessage.css';
import TextInputForm from '../common/TexInputForm';
import ResponseMessage from '../common/ResponseMessage';
import { resetPassword } from '../../Services/User/UserService';

interface ResetPasswordProps {
}

interface ResetPasswordState {
  usernameValue: string;
  responseMessage: string;
  isError: boolean;
}

class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
	constructor (props: ResetPasswordProps) {
		super(props);
		this.handleUsername = this.handleUsername.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.state = {
			usernameValue: '',
			responseMessage: '',
			isError: true
		};
	}

	handleUsername (userName: string) {
		this.setState({ usernameValue: userName });
	}

	_onSubmit () {
		resetPassword(this.state.usernameValue).then(response => {
			this.setState({ isError: false, responseMessage: 'Reset password successfully' });
		})
			.catch(error => {
				this.setState({ isError: true, responseMessage: error });
			});
	}

	render () {
		const { usernameValue } = this.state;
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={usernameValue}
							setValue={this.handleUsername}
							title="Username of account to reset"
						/>
					</div>
				</div>
				<div className="admin-form-row-two">
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnCreateCollegeTeam"
							onClick={this._onSubmit}
						>
              			Reset Password
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
export default ResetPassword;
