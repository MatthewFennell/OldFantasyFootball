import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { deletePlayer } from '../../Services/Player/PlayerService';
import '../../Style/Admin/ErrorMessage.css';
import ResponseMessage from '../common/ResponseMessage';

interface DeletePlayerProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface DeletePlayerState {
  playerID: string;

  responseMessage: string;
  isError: boolean;
}

class DeletePlayer extends React.Component<DeletePlayerProps, DeletePlayerState> {
	constructor (props: DeletePlayerProps) {
		super(props);
		this._handlePlayerID = this._handlePlayerID.bind(this);
		this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			playerID: 'No player selected',
			responseMessage: '',
			isError: false
		};
	}

	_handlePlayerID (playerID: string) {
		this.setState({ playerID });
	}

	_handleCollegeTeam (team: string) {
		const { setTeamAddingPoints } = this.props;
		setTeamAddingPoints(team);
	}

	handleValidate () {
		const { playerID } = this.state;
		if (playerID === 'No player selected') {
			this.setState({ responseMessage: 'Please select a player (UI)', isError: true });
		} else {
			this._onSubmit();
		}
	}

	_onSubmit () {
		const { playerID } = this.state;
		deletePlayer(playerID)
			.then(response => {
				this.setState({ responseMessage: 'Player deleted successfully', isError: false });
			})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true });
			});
	}

	render () {
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<CollegeTeam setTeam={this._handleCollegeTeam} />
					</div>
					<div className="admin-wrapper">
						<SelectPlayer
							onlyDefenders={false}
							setPlayerID={this._handlePlayerID}
						/>
					</div>

				</div>
				<div className="admin-form-row-two" />
				<div>
					<Button
						className="btn btn-default btn-round-lg btn-lg second"
						id="btnDeletePlayer"
						onClick={this.handleValidate}
					>
            Delete player
					</Button>
				</div>
				<ResponseMessage
					isError={this.state.isError}
					responseMessage={this.state.responseMessage}
					shouldDisplay={this.state.responseMessage.length > 0}
				/>
			</div>
		);
	}
}
export default DeletePlayer;
