import * as React from 'react';
import '../../Style/Admin/Captain/Captain.css';
import CreatePlayer from './CreatePlayer';
import AddResult from './AddResult';
import { getTeamOfCaptain } from '../../Services/User/UserService';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { findPlayersInCollegeTeam } from '../../Services/Player/PlayerService';
import EditPoints from './EditPoints';

interface CaptainState {
	teamName: string;
}

interface CaptainProps {
  setCaptainPageBeingViewed: (captainPageBeingViewed: string) => void;
  captainPageBeingViewed: string;
  setPlayersInFilteredTeam: (players: PlayerDTO[]) => void;
  playersInFilteredTeam: PlayerDTO[];
}

class Captain extends React.Component<CaptainProps, CaptainState> {
	constructor (props: CaptainProps) {
		super(props);
		this._setPageBeingViewed = this._setPageBeingViewed.bind(this);
		this.state = {
			teamName: ''
		};

		getTeamOfCaptain().then(response => {
			this.setState({ teamName: response.name });
			findPlayersInCollegeTeam(response.name).then(response => {
				this.props.setPlayersInFilteredTeam(response);
			});
		})
			.catch(error => {
				console.log('error = ' + error);
			});
	}

	_setPageBeingViewed (pageToView: string) {
		this.props.setCaptainPageBeingViewed(pageToView);
	}

	_selectedOrNot (input: string) {
		return input === this.props.captainPageBeingViewed ? 'raise-selected' : 'raise';
	}

	render () {
		const { captainPageBeingViewed } = this.props;
		return (
			<div className="outer-captain-columns">
				<div className="left-rows">
					<div className="captain-info-row">
						<div
							className={this._selectedOrNot('create-player')}
							onClick={() => this.props.setCaptainPageBeingViewed('create-player')}
						>
              			Create Player
						</div>
						<div
							className={this._selectedOrNot('add-result')}
							onClick={() => this.props.setCaptainPageBeingViewed('add-result')}
						>
              			Create Result
						</div>
						<div
							className={this._selectedOrNot('edit-stats')}
							onClick={() => this.props.setCaptainPageBeingViewed('edit-stats')}
						>
              			Edit Stats
						</div>
					</div>
					<div className="captain-of-which-team">
						You are the captain of team: {this.state.teamName}
					</div>
					{captainPageBeingViewed === 'create-player' ? (
						<CreatePlayer teamName={this.state.teamName} />
					) : captainPageBeingViewed === 'add-result' ? (
						<AddResult
							teamName={this.state.teamName}
						/>
					) : captainPageBeingViewed === 'edit-stats' ? (
						<EditPoints playersInFilteredTeam={this.props.playersInFilteredTeam} />
					) : null}
				</div>
			</div>
		);
	}
}
export default Captain;
