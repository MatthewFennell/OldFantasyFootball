import * as React from 'react';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import { Button } from 'reactstrap';
import { CollegeTeam as CT } from '../../Models/Interfaces/CollegeTeam';
import '../../Style/Admin/ErrorMessage.css';
import '../../Style/Admin/CreatePlayerForm.css';
import ResponseMessage from '../common/ResponseMessage';
import TextInputForm from '../common/TexInputForm';
import { makeCaptain } from '../../Services/User/UserService';
import { MakeCaptain as MakeCaptainDTO } from '../../Models/Interfaces/MakeCaptain';

interface MakeCaptainProps {
  allCollegeTeams: CT[];
}

interface MakeCaptainState {
  teamValue: string;
  captainsUsername: string;
  responseMessage: string;
  isError: boolean;
}

// eslint-disable-next-line react/require-optimization
class MakeCaptain extends React.Component<MakeCaptainProps, MakeCaptainState> {
	constructor (props: MakeCaptainProps) {
		super(props);
		this._handleTeamChange = this._handleTeamChange.bind(this);
		this._handleFirstName = this._handleFirstName.bind(this);
		this._onSubmit = this._onSubmit.bind(this);

		const { allCollegeTeams } = this.props;

		this.state = {
			teamValue: allCollegeTeams.length > 0 ? allCollegeTeams[0].name : '',
			captainsUsername: '',
			responseMessage: '',
			isError: false
		};
	}

	_handleTeamChange (team: string) {
		this.setState({ teamValue: team });
	}

	_handleFirstName (firstname: string) {
		this.setState({ captainsUsername: firstname });
	}

	_onSubmit () {
		const captainInfo: MakeCaptainDTO = {
			username: this.state.captainsUsername,
			teamname: this.state.teamValue
		};
		makeCaptain(captainInfo).then(response => {
			this.setState({ isError: false, responseMessage: 'Captain successfully set' });
		})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true });
			});
	}

	render () {
		const { captainsUsername } = this.state;
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={captainsUsername}
							setValue={this._handleFirstName}
							title="Captains Username"
						/>
					</div>
					<div className="admin-wrapper">
						<CollegeTeam setTeam={this._handleTeamChange} />
					</div>
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnCreatePlayer"
							onClick={this._onSubmit}
						>
                    Make player captain
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
export default MakeCaptain;
