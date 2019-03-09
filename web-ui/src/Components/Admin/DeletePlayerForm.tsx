import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { deletePlayer } from '../../Services/Player/PlayerService';
import '../../Style/Admin/ErrorMessage.css';

interface DeletePlayerProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface DeletePlayerState {
  playerID: string;
  playerDeleted: boolean;
  errorMessage: string;
}

class DeletePlayer extends React.Component<DeletePlayerProps, DeletePlayerState> {
	constructor (props: DeletePlayerProps) {
		super(props);
		this._handlePlayerID = this._handlePlayerID.bind(this);
		this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = {
			playerID: 'No player selected',
			playerDeleted: false,
			errorMessage: ''
		};
	}

	_handlePlayerID (playerID: string) {
		this.setState({ playerID });
	}

	_handleCollegeTeam (team: string) {
		const { setTeamAddingPoints } = this.props;
		setTeamAddingPoints(team);
	}

	_removeErrorMessage () {
		this.setState({ playerDeleted: false });
		this.setState({ errorMessage: '' });
	}

	handleValidate () {
		const { playerID } = this.state;
		if (playerID === 'No player selected') {
			this.setState({ errorMessage: 'Please select a player (UI)' });
			this.setState({ playerDeleted: false });
			setTimeout(this._removeErrorMessage, 10000);
		} else {
			this._onSubmit();
		}
	}

	_onSubmit () {
		const { playerID } = this.state;
		deletePlayer(playerID)
			.then(response => {
				this.setState({ playerDeleted: true });
				this.setState({ errorMessage: '' });
				setTimeout(this._removeErrorMessage, 10000);
			})
			.catch(error => {
				this.setState({ errorMessage: error });
				this.setState({ playerDeleted: false });
				setTimeout(this._removeErrorMessage, 10000);
			});
	}

	render () {
		const { playerDeleted, errorMessage } = this.state;

		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<CollegeTeam setTeam={this._handleCollegeTeam} />
					<SelectPlayer
						onlyDefendwrs={false}
						setPlayerID={this._handlePlayerID}
					/>
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
				{playerDeleted ? (
					<div className="error-message-animation"> Player deleted successfully! </div>
				) : null}
				{errorMessage ? (
					<div className="error-message-animation"> Error : {errorMessage} </div>
				) : null}
			</div>
		);
	}
}
export default DeletePlayer;
