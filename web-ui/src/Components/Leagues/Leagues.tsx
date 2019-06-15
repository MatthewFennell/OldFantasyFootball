import * as React from 'react';
import '../../Style/League/League.css';
import {
	getPositionsOfUsersInLeague,
	getLeagueAdmin,
	getLeaguesAndPositions
} from '../../Services/League/LeagueService';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueTableBody from './LeagueTableBody';
import { Container } from 'reactstrap';
import { Row, Col } from 'react-bootstrap';
import CreateLeague from './CreateLeague';
import JoinLeague from './JoinLeague';
import RankingsTableBody from './RankingsTableBody';
import { UserLeaguePosition } from '../..//Models/Interfaces/UserLeaguePosition';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { getUserInfo } from '../../Services/User/UserService';
import LeaveLeague from './LeaveLeague';
import DeleteLeague from './DeleteLeague';
import Media from 'react-media';
import { getTeamForUserInWeek } from '../../Services/Player/PlayerService';
import { PlayerDTO } from '../../Models/Interfaces/Player';

interface LeagueProps {
	accountId: string;
	leaguePageBeingViewed: string;
	leagueRankings: UserLeaguePosition[];
	isAdmin: boolean;
	leagueCode: string;
	setLeaguePageBeingViewed: (leaguePageBeingViewed: string) => void;
	setLeagueRankings: (leagueRankings: UserLeaguePosition[]) => void;
	setIsLeagueAdmin: (isAdmin: boolean) => void;
	setLeagueCode: (code: string) => void;
	setPageBeingViewed: (page: string) => void;
	setUserBeingViewed: (user: string) => void;
	setLeagues: (user: string, leagueName: string, position: number) => void;
	removeLeagues: (user: string, leagueName: string) => void;
	userBeingViewed: string;
	leagues: { user: { league: { leagueName: string; position: number } } }
	weekBeingViewed: number;
	team: { user: { weeks: { id: string; team: PlayerDTO[] } } }
    setTeam: (user: string, week: number, team: PlayerDTO[]) => void;
}

interface LeaguesState {
	leaguesMessage: string;
}

class Leagues extends React.Component<RoutedFormProps<RouteComponentProps> & LeagueProps, LeaguesState> {
	constructor (props: RoutedFormProps<RouteComponentProps> & LeagueProps) {
		super(props);
		this._setLeagueBeingViewed = this._setLeagueBeingViewed.bind(this);
		this.handleViewUser = this.handleViewUser.bind(this);
		this.generateLeaguePositions = this.generateLeaguePositions.bind(this);
		this.findLeaguesAndPositions = this.findLeaguesAndPositions.bind(this);
		this.generateLeaguesMessage = this.generateLeaguesMessage.bind(this);
		this.checkingOtherLeague = this.checkingOtherLeague.bind(this);
		this.state = {
			leaguesMessage: ''
		};
		const createHandler = (message: string) => () => {
			this.props.setLeaguePageBeingViewed(message);
		};
		this.handlers = {
			home: createHandler('home'),
			createLeague: createHandler('create-league'),
			joinLeague: createHandler('join-league'),
			leaveLeague: createHandler('leave-league'),
			deleteLeague: createHandler('delete-league'),
		};
	}

	componentDidMount () {
		if (this.props.userBeingViewed !== '') {
			this.findLeaguesAndPositions();
			this.generateLeaguesMessage();
		}
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			this.findLeaguesAndPositions();
			this.generateLeaguesMessage();
		}
	}

	checkingOtherLeague () {
		if (this.props.leaguePageBeingViewed === 'home') {
			return false;
		}
		if (this.props.leaguePageBeingViewed === 'create-league') {
			return false;
		}
		if (this.props.leaguePageBeingViewed === 'join-league') {
			return false;
		}
		if (this.props.leaguePageBeingViewed === 'leave-league') {
			return false;
		}
		if (this.props.leaguePageBeingViewed === 'delete-league') {
			return false;
		}
		return true;
	}

	handlers: { createLeague: () => void;
		home: () => void;
		joinLeague: () => void;
		leaveLeague: () => void;
		deleteLeague: () => void;
	};

	findLeaguesAndPositions () {
		const activeLeagues = this.props.leagues[this.props.userBeingViewed];
		if (activeLeagues === undefined || Object.entries(activeLeagues).length === 0) {
			getLeaguesAndPositions(this.props.userBeingViewed).then(leagueAndPositionsArray => {
				for (let x = 0; x < leagueAndPositionsArray.length; x++) {
					this.props.setLeagues(this.props.userBeingViewed,
						leagueAndPositionsArray[x].leagueName,
						leagueAndPositionsArray[x].position);
				}
			});
		}
	}

	_setLeagueBeingViewed (leagueToView: string) {
		// TO:DO - Combine into one request?
		const { setLeagueRankings, setLeaguePageBeingViewed } = this.props;

		setLeaguePageBeingViewed(leagueToView);
		getPositionsOfUsersInLeague(leagueToView).then(leagueRankings => {
			setLeagueRankings(leagueRankings);
		});

		getLeagueAdmin(leagueToView).then(response => {
			this.props.setIsLeagueAdmin(response.userIsAdmin);
			this.props.setLeagueCode(response.code);
		});
	}

	handleViewUser (id: string) {
		if (this.props.weekBeingViewed !== 0 && (this.props.team[id] === undefined ||
			this.props.team[id]['week-' + this.props.weekBeingViewed] === undefined)) {
			getTeamForUserInWeek(id, this.props.weekBeingViewed).then(response => {
				this.props.setTeam(id, this.props.weekBeingViewed, response);
				this.props.setUserBeingViewed(id);
				this.props.setPageBeingViewed('Team');
				this.props.history.push('/team');
			}).catch(() => {

			});
		} else {
			this.props.setUserBeingViewed(id);
			this.props.setPageBeingViewed('Team');
			this.props.history.push('/team');
		}
	}

	generateLeaguePositions () {
		if (this.props.leagues[this.props.userBeingViewed] === undefined) {
			return [];
		} else {
			let leagues: LeaguePositions[] = [];
			let keys = Object.keys(this.props.leagues[this.props.userBeingViewed]);
			keys.map(obj => leagues.push(
				{ leagueName: obj,
					position: this.props.leagues[this.props.userBeingViewed][obj],
					id: this.props.leagues[this.props.userBeingViewed][obj] }
			));
			return leagues;
		}
	}

	generateLeaguesMessage () {
		if (this.props.accountId === this.props.userBeingViewed) {
			this.setState({ leaguesMessage: 'My leagues' });
		} else {
			getUserInfo(this.props.userBeingViewed).then(response => {
				this.setState({ leaguesMessage: 'You are viewing leagues of ' + response.firstName + '  ' + response.surname });
			}).catch(() => {
			});
		}
	}

	_selectedOrNot (input: string) {
		return input === this.props.leaguePageBeingViewed ? 'raise-league-selected' : 'raise-league';
	}

	render () {
		let leagues: LeaguePositions[] = this.generateLeaguePositions();

		const offSet = this.props.leaguePageBeingViewed === 'home' ? 0 : 0;
		const width = this.props.leaguePageBeingViewed === 'home' ? 6 : 6;

		return (

			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						<div className="leagues-mobile-wrapper">
							<div className="leagues-header">
							Leagues
							</div>
							<div className="flex-container-two">
								<div className="create league">
									<div
										className={this._selectedOrNot('home')}
										onClick={this.handlers.home}
									>
										Home
									</div>
								</div>
								<div className="create league">
									<div
										className={this._selectedOrNot('create-league')}
										onClick={this.handlers.createLeague}
									>
										Create
									</div>
								</div>
								<div className="join-league">
									<div
										className={this._selectedOrNot('join-league')}
										onClick={this.handlers.joinLeague}
									>
										Join
									</div>
								</div>
							</div>
							<div className="flex-container-two">
								<div className="leave-league">
									<div
										className={this._selectedOrNot('leave-league')}
										onClick={this.handlers.leaveLeague}
									>
										Leave
									</div>
								</div>

								<div className="delete-league">
									<div
										className={this._selectedOrNot('delete-league')}
										onClick={this.handlers.deleteLeague}
									>
										Delete
									</div>
								</div>
								<div className="delete-league">
									<div
										className={this.checkingOtherLeague() ? 'raise-league-selected' : 'raise-league'}
										onClick={() => this._setLeagueBeingViewed('Collingwood')}
									>
										Rankings
									</div>
								</div>
							</div>
							{this.props.leaguePageBeingViewed === 'home'
								? <div className="league-wrapper">
									<LeagueTableBody
										leagues={leagues}
										setLeagueBeingViewed={this._setLeagueBeingViewed}
									/></div> : null}
							{this.props.leaguePageBeingViewed === 'create-league'
							 	? <CreateLeague
								 setLeagues={this.props.setLeagues}
								 userBeingViewed={this.props.userBeingViewed}
								   /> : null }
							{this.props.leaguePageBeingViewed === 'join-league'
								? <JoinLeague
									setLeagues={this.props.setLeagues}
									userBeingViewed={this.props.userBeingViewed}
								  /> : null }
							{this.props.leaguePageBeingViewed === 'leave-league'
								? <LeaveLeague
									leagues={this.props.leagues}
									removeLeagues={this.props.removeLeagues}
									setLeagues={this.props.setLeagues}
									userBeingViewed={this.props.userBeingViewed}
								  /> : null}
							{ this.props.leaguePageBeingViewed === 'delete-league'
								  	? <DeleteLeague
									  leagues={this.props.leagues}
									  removeLeagues={this.props.removeLeagues}
									  setLeagues={this.props.setLeagues}
									  userBeingViewed={this.props.userBeingViewed}
								  	  /> : null}

							{ this.checkingOtherLeague()
								? <RankingsTableBody
									code={this.props.leagueCode}
									handleViewUser={this.handleViewUser}
									isAdmin={this.props.isAdmin}
									leagueBeingViewed={this.props.leaguePageBeingViewed}
									leagueRankings={this.props.leagueRankings}
								  /> : null}
						</div>
					) : (
						<Container>
							<Row>
								<Col
									className="my-leagues-column-one"
									lg={width}
									lgOffset={offSet}
									md={width}
									mdOffset={offSet}
									xs={width}
									xsOffset={offSet}
								>
									<div className="outer-league-rows">
										<div className="my-leagues">
											<div className="my-leagues-header">
                				{this.state.leaguesMessage}
											</div>
											<div className="league-table">
												<LeagueTableBody
													leagues={leagues}
													setLeagueBeingViewed={this._setLeagueBeingViewed}
												/>
											</div>
										</div>

										<div>
											<div className="flex-container-two">
												<div className="create league">
													<div
														className={this._selectedOrNot('create-league')}
														onClick={this.handlers.createLeague}
													>
												Create league
													</div>
												</div>
												<div className="join-league">
													<div
														className={this._selectedOrNot('join-league')}
														onClick={this.handlers.joinLeague}
													>
												Join league
													</div>
												</div>
											</div>
											<div className="flex-container-two">
												<div className="leave-league">
													<div
														className={this._selectedOrNot('leave-league')}
														onClick={this.handlers.leaveLeague}
													>
												Leave league
													</div>
												</div>

												<div className="delete-league">
													<div
														className={this._selectedOrNot('delete-league')}
														onClick={this.handlers.deleteLeague}
													>
												Delete league
													</div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								{this.props.leaguePageBeingViewed === 'create-league'
									? <CreateLeague
										setLeagues={this.props.setLeagues}
										userBeingViewed={this.props.userBeingViewed}
									  />
									: this.props.leaguePageBeingViewed === 'join-league'
										? <JoinLeague
											setLeagues={this.props.setLeagues}
											userBeingViewed={this.props.userBeingViewed}
										  />
										: this.props.leaguePageBeingViewed === 'leave-league'
											? <LeaveLeague
												leagues={this.props.leagues}
												removeLeagues={this.props.removeLeagues}
												setLeagues={this.props.setLeagues}
												userBeingViewed={this.props.userBeingViewed}
											  />

								  : this.props.leaguePageBeingViewed === 'delete-league'
								  	? <DeleteLeague
									  leagues={this.props.leagues}
									  removeLeagues={this.props.removeLeagues}
									  setLeagues={this.props.setLeagues}
									  userBeingViewed={this.props.userBeingViewed}
								  	  />

												: this.props.leaguePageBeingViewed !== 'home'
													? <RankingsTableBody
														code={this.props.leagueCode}
														handleViewUser={this.handleViewUser}
														isAdmin={this.props.isAdmin}
														leagueBeingViewed={this.props.leaguePageBeingViewed}
														leagueRankings={this.props.leagueRankings}
													  />
													: null}
							</Row>
						</Container>
					)
				}
			</Media>

		);
	}
}
export default withRouter(Leagues);
