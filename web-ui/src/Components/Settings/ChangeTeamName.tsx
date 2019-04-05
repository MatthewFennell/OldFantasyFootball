import * as React from 'react';
import { Button } from 'reactstrap';
import { validCollegeName } from '../../Services/CredentialInputService';
import TextInputForm from '../common/TexInputForm';
import '../../Style/Settings/ChangeTeamName.css';
import { patchTeamName } from '../../Services/User/UserService';

interface ChangeTeamNameProps {
}

interface ChangeTeamNameState {
  teamNameValue: string;
  collegeTeamCreated: boolean;
  previousCollegeTeamMade: string;
  errorMessage: string;
}

// eslint-disable-next-line react/require-optimization
class ChangeTeamName extends React.Component<ChangeTeamNameProps, ChangeTeamNameState> {
	constructor (props: ChangeTeamNameProps) {
		super(props);
		this.handleTeamName = this.handleTeamName.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			teamNameValue: 'Please select a team',
			collegeTeamCreated: false,
			previousCollegeTeamMade: '',
			errorMessage: ''
		};
	}

	handleTeamName (teamNameValue: string) {
		this.setState({ teamNameValue });
	}

	handleValidate () {
		const { teamNameValue } = this.state;
		if (validCollegeName(teamNameValue)) {
			this._onSubmit();
		} else {
			this.setState({ errorMessage: 'College team name does not match regex (UI)' });
			this.setState({ collegeTeamCreated: false });
			setTimeout(this._removeErrorMessage, 10000);
		}
	}

	_onSubmit () {
		console.log('name value = ' + this.state.teamNameValue);
		patchTeamName(this.state.teamNameValue).then(response => {
			console.log('response = ' + response);
		})
			.catch(error => {
				console.log('error = ' + error);
			});
	}

	_removeErrorMessage () {
		this.setState({ collegeTeamCreated: false });
		this.setState({ errorMessage: '' });
	}

	render () {
		const { teamNameValue } = this.state;
		return (
			<div className="team-name-form">
				<div className="team-name-form-row-one">
					<TextInputForm
						currentValue={teamNameValue}
						setValue={this.handleTeamName}
						title="Team name"
					/>
				</div>
				<div className="team-name-form-row-two">
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnChangeTeamName"
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
export default ChangeTeamName;
