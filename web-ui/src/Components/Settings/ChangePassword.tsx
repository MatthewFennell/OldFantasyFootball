import * as React from 'react';
import { Button } from 'reactstrap';
import TextInputForm from '../common/TexInputForm';
import '../../Style/Settings/ChangePassword.css';
import { patchPassword } from '../../Services/User/UserService';
import { PatchPassword } from '../../Models/Interfaces/PatchPassword';

interface CreateCollegeTeamProps {
}

interface CreateCollegeTeamState {
  teamNameValue: string;
  collegeTeamCreated: boolean;
  previousCollegeTeamMade: string;
  errorMessage: string;

  originalPassword: string;
  newPasswordOne: string;
  newPasswordTwo: string;
}

// eslint-disable-next-line react/require-optimization
class CreateCollegeTeam extends React.Component<CreateCollegeTeamProps, CreateCollegeTeamState> {
	constructor (props: CreateCollegeTeamProps) {
		super(props);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this._handleOriginalPassword = this._handleOriginalPassword.bind(this);
		this._handlePasswordOne = this._handlePasswordOne.bind(this);
		this._handlePasswordTwo = this._handlePasswordTwo.bind(this);
		this.state = {
			teamNameValue: 'Please select a team',
			originalPassword: '',
			newPasswordOne: '',
			newPasswordTwo: '',
			collegeTeamCreated: false,
			previousCollegeTeamMade: '',
			errorMessage: ''
		};
	}

	_handleCollegeName (collegeName: string) {
		this.setState({ teamNameValue: collegeName });
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
		console.log('original password = ' + this.state.originalPassword);
		console.log('new password = ' + this.state.newPasswordOne);
		console.log('new password = ' + this.state.newPasswordTwo);

		const { originalPassword, newPasswordOne, newPasswordTwo } = this.state;

		if (newPasswordOne === newPasswordTwo) {
			let data: PatchPassword = {
				originalPassword,
				newPasswordOne,
				newPasswordTwo
			};
			console.log('trying to patch');
			patchPassword(data).then(response => {
				console.log('reponse = ' + response);
			})
				.catch(error => {
					console.log('error = ' + error);
				});
		} else {
			console.log("passwords don't match");
		}
	}

	_removeErrorMessage () {
		this.setState({ collegeTeamCreated: false });
		this.setState({ errorMessage: '' });
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
					</div>
				</div>
			</div>
		);
	}
}
export default CreateCollegeTeam;
