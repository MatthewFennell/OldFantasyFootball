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
		this.handleSetPageBeingViewedCreate = this.handleSetPageBeingViewedCreate.bind(this);
		this.handleSetPageBeingViewedAddResult = this.handleSetPageBeingViewedAddResult.bind(this);
		this.handleSetPageBeingViewedEditStats = this.handleSetPageBeingViewedEditStats.bind(this);
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

	handleSetPageBeingViewedCreate () {
		this.props.setCaptainPageBeingViewed('create');
	}

	handleSetPageBeingViewedAddResult () {
		this.props.setCaptainPageBeingViewed('add-result');
	}

	handleSetPageBeingViewedEditStats () {
		this.props.setCaptainPageBeingViewed('edit-stats');
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
							className={this._selectedOrNot('create')}
							onClick={this.handleSetPageBeingViewedCreate}
						>
              			Create Player
						</div>
						<div
							className={this._selectedOrNot('add-result')}
							onClick={this.handleSetPageBeingViewedAddResult}
						>
              			Create Result
						</div>
						<div
							className={this._selectedOrNot('edit-stats')}
							onClick={this.handleSetPageBeingViewedEditStats}
						>
              			Edit Stats
						</div>
					</div>
					<div className="captain-of-which-team">
						You are the captain of team: {this.state.teamName}
					</div>
					{captainPageBeingViewed === 'create' ? (
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
