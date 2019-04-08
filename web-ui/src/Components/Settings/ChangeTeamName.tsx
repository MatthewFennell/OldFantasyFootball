import * as React from 'react';
import { Button } from 'reactstrap';
import { validCollegeName } from '../../Services/CredentialInputService';
import TextInputForm from '../common/TexInputForm';
import '../../Style/Settings/ChangeTeamName.css';
import { patchTeamName } from '../../Services/User/UserService';
import ResponseMessage from '../common/ResponseMessage';

interface ChangeTeamNameProps {
}

interface ChangeTeamNameState {
  teamNameValue: string;
  responseMessage: string;
  isError: boolean;
}

// eslint-disable-next-line react/require-optimization
class ChangeTeamName extends React.Component<ChangeTeamNameProps, ChangeTeamNameState> {
	constructor (props: ChangeTeamNameProps) {
		super(props);
		this.handleTeamName = this.handleTeamName.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			teamNameValue: 'Please select a team',
			responseMessage: '',
			isError: false
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
			this.setState({ responseMessage: 'Team name does not match regex (UI)', isError: true });
		}
	}

	_onSubmit () {
		patchTeamName(this.state.teamNameValue).then(response => {
			this.setState({ responseMessage: 'Team name succesfully updated to ' + this.state.teamNameValue, isError: false });
		})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true });
			});
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
export default ChangeTeamName;
