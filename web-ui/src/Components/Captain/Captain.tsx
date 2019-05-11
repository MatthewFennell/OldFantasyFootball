import * as React from 'react';
import '../../Style/Admin/Captain/Captain.css';
import CreatePlayer from './CreatePlayer';
import AddResult from '../Admin/AddResult';
import { getTeamOfCaptain, getIsCaptain } from '../../Services/User/UserService';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { findPlayersInCollegeTeam } from '../../Services/Player/PlayerService';
import EditPoints from '../Admin/EditPointsForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { noop } from 'lodash';
import Media from 'react-media';

interface CaptainState {
	teamName: string;
	isCaptain: boolean;
}

interface CaptainProps {
  setCaptainPageBeingViewed: (captainPageBeingViewed: string) => void;
  captainPageBeingViewed: string;
  setPlayersInFilteredTeam: (players: PlayerDTO[]) => void;
  playersInFilteredTeam: PlayerDTO[];
  setPageBeingViewed: (page: string) => void;
}

class Captain extends React.Component<RoutedFormProps<RouteComponentProps> & CaptainProps, CaptainState> {
	constructor (props: RoutedFormProps<RouteComponentProps> & CaptainProps) {
		super(props);
		this.state = {
			teamName: '',
			isCaptain: false
		};

		getIsCaptain().then(response => {
			if (response === false) {
				this.props.setPageBeingViewed('Team');
				this.props.history.push('/team');
			} else {
				this.setState({ isCaptain: true });
			}
		});

		getTeamOfCaptain().then(response => {
			this.setState({ teamName: response.name });
			findPlayersInCollegeTeam(response.name).then(response => {
				this.props.setPlayersInFilteredTeam(response);
			});
		})
			.catch(error => {
				console.log('error = ' + error);
			});

		const createHandler = (message: string) => () => this.props.setCaptainPageBeingViewed(message);
		this.handlers = {
			createPlayer: createHandler('create-player'),
			editStats: createHandler('edit-stats'),
			addResult: createHandler('add-result'),
		};
	}

	handlers: { createPlayer: () => void;
		editStats: () => void;
		addResult: () => void;
	};

	_selectedOrNot (input: string) {
		return input === this.props.captainPageBeingViewed ? 'raise-selected' : 'raise';
	}

	render () {
		const { captainPageBeingViewed } = this.props;
		return (

			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						this.state.isCaptain ? <div className="captain-mobile-wrapper">
							<div className="captain-header">
							You are the captain of team: {this.state.teamName}
							</div>
							<div className="captain-info-row">
								<div
									className={this._selectedOrNot('create-player')}
									onClick={this.handlers.createPlayer}
								>
					  				Create Player
								</div>
								<div
									className={this._selectedOrNot('add-result')}
									onClick={this.handlers.addResult}
								>
					  				Create Result
								</div>
								<div
									className={this._selectedOrNot('edit-stats')}
									onClick={this.handlers.editStats}
								>
					  				Edit Stats
								</div>
							</div>
							{captainPageBeingViewed === 'create-player' ? (
								<CreatePlayer
									collegeTeam={this.state.teamName}
								/>) : null}
						</div> : null
					) : (
						this.state.isCaptain ? (<div className="outer-captain-columns">
							<div className="left-rows">
								<div className="captain-info-row">
									<div
										className={this._selectedOrNot('create-player')}
										onClick={this.handlers.createPlayer}
									>
					  				Create Player
									</div>
									<div
										className={this._selectedOrNot('add-result')}
										onClick={this.handlers.addResult}
									>
					  					Create Result
									</div>
									<div
										className={this._selectedOrNot('edit-stats')}
										onClick={this.handlers.editStats}
									>
					  					Edit Stats
									</div>
								</div>
								<div className="captain-of-which-team">
										You are the captain of team: {this.state.teamName}
								</div>
								{captainPageBeingViewed === 'create-player' ? (
									<CreatePlayer
										allCollegeTeams={[]}
										collegeTeamName={this.state.teamName}
									/>
								) : captainPageBeingViewed === 'add-result' ? (
									<AddResult
										allCollegeTeams={[]}
										collegeTeamName={this.state.teamName}
										setTeamAddingPoints={noop}
									/>
								) : captainPageBeingViewed === 'edit-stats' ? (
									<EditPoints
										collegeTeamName={this.state.teamName}
										playersInFilteredTeam={this.props.playersInFilteredTeam}
										setTeamAddingPoints={noop}
									/>
								) : null}
							</div>
						</div>) : null
					)
				}
			</Media>

		);
	}
}
export default withRouter(Captain);
