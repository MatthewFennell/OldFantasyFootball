import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import { deletePlayer } from '../../../Services/Player/PlayerService';
import '../../../Style/Admin/ErrorMessage.css';

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
		this._onValidate = this._onValidate.bind(this);
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
		this.props.setTeamAddingPoints(team);
	}

	_removeErrorMessage () {
		this.setState({ playerDeleted: false });
		this.setState({ errorMessage: '' });
	}

	_onValidate () {
		if (this.state.playerID === 'No player selected') {
			this.setState({ errorMessage: 'Please select a player (UI)' });
			this.setState({ playerDeleted: false });
			setTimeout(this._removeErrorMessage, 10000);
		} else {
			this._onSubmit();
		}
	}

	_onSubmit () {
		deletePlayer(this.state.playerID)
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
		let setTeam = this._handleCollegeTeam;
		let setPlayerID = this._handlePlayerID;

		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<CollegeTeam setTeam={setTeam} />
					<SelectPlayer
						onlyDefendwrs={false}
						setPlayerID={setPlayerID}
					/>
				</div>
				<div className="admin-form-row-two" />
				<div>
					<Button
						className="btn btn-default btn-round-lg btn-lg second"
						id="btnDeletePlayer"
						onClick={() => this._onValidate()}
					>
            Delete player
					</Button>
				</div>
				{this.state.playerDeleted ? (
					<div className="error-message-animation"> Player deleted successfully! </div>
				) : null}
				{this.state.errorMessage ? (
					<div className="error-message-animation"> Error : {this.state.errorMessage} </div>
				) : null}
			</div>
		);
	}
}
export default DeletePlayer;
