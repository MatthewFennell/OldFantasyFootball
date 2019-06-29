import * as React from 'react';
import '../../Style/Team/Team.css';
import '../../Style/Team/PitchLayout/Pitch.css';
import Info from '../../Containers/Team/Info';
import Stats from '../../Containers/Team/Stats';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { MostValuable } from '../../Models/Interfaces/MostValuable';
import Pitch from './PitchLayout/Pitch';
import TeamData from '../../Containers/Team/TeamData';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueTableBody from '../Leagues/LeagueTableBody';
import PlayerStats from './PlayerStats';
import { getPlayerStatsForWeek, getTeamForUserInWeek } from '../../Services/Player/PlayerService';
import { PlayerStatsDTO } from './PlayerStatsType';
import { PlayerPointsDTO } from '../../Models/Interfaces/PlayerPointsType';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import {
	getPositionsOfUsersInLeague, getLeagueAdmin, getLeaguesAndPositions
} from '../../Services/League/LeagueService';
import { UserLeaguePosition } from '../..//Models/Interfaces/UserLeaguePosition';
import { getUserInfo } from '../../Services/User/UserService';
import { noop } from 'lodash';
import Media from 'react-media';

interface TeamProps {
	accountId: string;
	weekBeingViewed: number;
	weeklyTeam: any;
	mostValuable: MostValuable;
	totalNumberOfWeeks: number;
	userBeingViewed: string;
	isAdmin: boolean;
	leagueCode: string;
	setLeaguePageBeingViewed: (leaguePageBeingViewed: string) => void;
	setLeagueRankings: (leagueRankings: UserLeaguePosition[]) => void;
	setPageBeingViewed: (page: string) => void;
	setIsLeagueAdmin: (isAdmin: boolean) => void;
	setLeagueCode: (code: string) => void;
	team: { user: { weeks: { id: string; team: PlayerDTO[] } } }
	setTeam: (user: string, week: number, team: PlayerDTO[]) => void;
	setMostValuable: (user: string, mostValuable: MostValuable) => void;
	setLeagues: (user: string, leagueName: string, position: number) => void;
	leagues: { user: { league: { leagueName: string; position: number } } }
	teamToRender: PlayerDTO[];
	originalTransferTeam: PlayerDTO[];
	setCurrentTransferTeam: (currentTransferTeam: PlayerDTO[]) => void;
    setOriginalTransferTeam: (originalTransferTeam: PlayerDTO[]) => void;
    firstName: string;
}

interface TeamState {
	playerStatsBeingViewed: PlayerStatsDTO;
	teamNameBeingViewed: string;
	statsBeingViewed: boolean;
	playerPointsBeingViewed: PlayerPointsDTO;
	playerPointsViewed: boolean;
	playerSidebar: PlayerDTO;
	weekBeingViewed: number;
	usernameBeingViewed: string;
}

class Team extends React.Component<RoutedFormProps<RouteComponentProps> & TeamProps, TeamState> {
	constructor (props: RoutedFormProps<RouteComponentProps> & TeamProps) {
		super(props);
		this.handleClickOnPlayer = this.handleClickOnPlayer.bind(this);
		this.onHandleWeek = this.onHandleWeek.bind(this);
		this.setLeague = this.setLeague.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.findLeagues = this.findLeagues.bind(this);
		this.generateLeaguePositions = this.generateLeaguePositions.bind(this);
		this.generateRowClassName = this.generateRowClassName.bind(this);
		this.findAllTeams = this.findAllTeams.bind(this);
		this.findTransferTeam = this.findTransferTeam.bind(this);
		this.state = {
			playerStatsBeingViewed: {} as any,
			statsBeingViewed: false,
			playerPointsBeingViewed: {} as any,
			playerPointsViewed: false,
			playerSidebar: {} as any,
			weekBeingViewed: this.props.totalNumberOfWeeks,
			usernameBeingViewed: '',
			teamNameBeingViewed: '',
		};
		this.updateUserInfo();
		this.findLeagues();
		this.findAllTeams();
		this.findTransferTeam();
	}

	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = false;
		}
	}

	componentDidUpdate (prevProps:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			this.updateUserInfo();
			this.findLeagues();
			this.findAllTeams();
		}

		if (prevProps.accountId !== this.props.accountId) {
			this.findTransferTeam();
		}

		if (prevProps.totalNumberOfWeeks !== this.props.totalNumberOfWeeks) {
			this.findAllTeams();
		}
	}

	findAllTeams () {
		for (let week = -1; week <= this.props.totalNumberOfWeeks; week++) {
			if (this.props.userBeingViewed !== '' && week !== 0 && (this.props.team[this.props.userBeingViewed] === undefined ||
					this.props.team[this.props.userBeingViewed]['week-' + week] === undefined)) {
				getTeamForUserInWeek(this.props.userBeingViewed, week).then(response => {
					this.props.setTeam(this.props.userBeingViewed, week, response);
				}).catch(() => {
				});
			}
		}
	}

	findTransferTeam () {
		if (this.props.accountId !== '' && Object.entries(this.props.originalTransferTeam).length === 0) {
			getTeamForUserInWeek(this.props.accountId, -1).then(response => {
				this.props.setOriginalTransferTeam(response);
				this.props.setCurrentTransferTeam(response);
			}).catch(() => {
			});
		}
	}

	findLeagues () {
		if (this.props.userBeingViewed !== '' &&
		this.props.leagues[this.props.userBeingViewed] === undefined) {
			getLeaguesAndPositions(this.props.userBeingViewed).then(leagueAndPositionsArray => {
				for (let x = 0; x < leagueAndPositionsArray.length; x++) {
					this.props.setLeagues(this.props.userBeingViewed,
						leagueAndPositionsArray[x].leagueName,
						leagueAndPositionsArray[x].position);
				}
			});
		}
	}

	updateUserInfo () {
		if (this.props.userBeingViewed !== '') {
			getUserInfo(this.props.userBeingViewed).then(response => {
				this.setState({ usernameBeingViewed: response.firstName + ' ' + response.surname });
				this.setState({ teamNameBeingViewed: response.teamName });
			}).catch(() => {
			});
		}
	}

	onHandleWeek (week: number) {
		this.setState({ weekBeingViewed: week });
		getPlayerStatsForWeek(week, this.state.playerSidebar.id).then(response => {
			let playerPoints :PlayerPointsDTO = {
				goals: response.goals,
				assists: response.assists,
				manOfTheMatch: response.manOfTheMatch ? 'Yes ' : 'No',
				yellowCards: response.yellowCards,
				redCard: response.redCard ? 'Yes' : 'No',
				week: response.week
			};
			this.setState({ playerPointsBeingViewed: playerPoints, playerPointsViewed: true });
		})
			.catch(() => {
				this.setState({ playerPointsBeingViewed: {} as any, playerPointsViewed: false });
			});
	}

	handleClickOnPlayer (player: PlayerDTO, week:number = this.props.weekBeingViewed) {
		if (week === -1) {
			week = this.props.totalNumberOfWeeks;
		}
		week === -1 ? this.setState({ weekBeingViewed: this.props.totalNumberOfWeeks }) : this.setState({ weekBeingViewed: week });
		let playerStats: PlayerStatsDTO = {
			firstName: player.firstName,
			surname: player.surname,
			position: player.position,
			points: player.points,
			price: player.price,
			totalGoals: player.totalGoals,
			totalAssists: player.totalAssists
		};
		this.setState({ playerSidebar: player });
		this.setState({ statsBeingViewed: true, playerStatsBeingViewed: playerStats });

		getPlayerStatsForWeek(week, player.id).then(response => {
			let playerPoints :PlayerPointsDTO = {
				goals: response.goals,
				assists: response.assists,
				manOfTheMatch: response.manOfTheMatch ? 'Yes ' : 'No',
				yellowCards: response.yellowCards,
				redCard: response.redCard ? 'Yes' : 'No',
				week: response.week

			};
			this.setState({ playerPointsBeingViewed: playerPoints, playerPointsViewed: true });
		})
			.catch(() => {
				this.setState({ playerPointsBeingViewed: {} as any, playerPointsViewed: false });
			});
	}

	setLeague (leagueToView: string) {
		this.props.setLeaguePageBeingViewed(leagueToView);
		this.props.setPageBeingViewed('Leagues');
		this.props.history.push('/leagues');
		getPositionsOfUsersInLeague(leagueToView).then(leagueRankings => {
			this.props.setLeagueRankings(leagueRankings);
		});

		getLeagueAdmin(leagueToView).then(response => {
			this.props.setIsLeagueAdmin(response.userIsAdmin);
			this.props.setLeagueCode(response.code);
		});
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

	generateRowClassName () {
		if (this.props.userBeingViewed === this.props.accountId) {
			return 'row-3-squad-my-team';
		} else {
			return 'row-3-squad-other-team';
		}
	}

	render () {
		let leagues: LeaguePositions[] = this.generateLeaguePositions();
		return (
			<div className="outer-rows">
				<TeamData />
				<div className="row-1-info">
					<Info />
				</div>
				<div className="row-2-stats">
					<Stats />
				</div>
				<div className="row-3-stats">
					{ this.state.teamNameBeingViewed && this.state.usernameBeingViewed
						? <div className="team-and-username-pitch">
							<div className="pitchUsername">
								User: {this.state.usernameBeingViewed}
							</div>
							<div className="pitchTeamName">
								Team name: {this.state.teamNameBeingViewed}
							</div>
						</div> : <div className="team-and-username-pitch" />}
				</div>
				<div className={this.generateRowClassName()}>

					<Media query="(max-width: 800px)">
						{matches =>
							matches ? (
								null
							) : (
								<div className="player-stats">
									<PlayerStats
										handleWeek={this.onHandleWeek}
										playerPointsBeingViewed={this.state.playerPointsBeingViewed}
										playerPointsViewed={this.state.playerPointsViewed}
										playerStatsBeingViewed={this.state.playerStatsBeingViewed}
										statsBeingViewed={this.state.statsBeingViewed}
										totalNumberOfWeeks={this.props.totalNumberOfWeeks}
										userBeingViewed={this.props.userBeingViewed}
										weekBeingViewed={this.state.weekBeingViewed}
									/>
								</div>
							)
						}
					</Media>

					<Pitch
						activeWeeklyTeam={this.props.teamToRender}
						handleClickOnPlayer={this.handleClickOnPlayer}
						noPoints={this.props.weekBeingViewed === -1}
						originalTransferTeam={this.props.originalTransferTeam}
						removePlayer={noop}
						setPositionFilter={() => {}}
						transfer={false}
					/>

					<Media query="(max-width: 800px)">
						{matches =>
							matches ? (
								null
							) : (
								<div className="leagues-team">
									<div className="league-table">
										<LeagueTableBody
											leagues={leagues}
											setLeagueBeingViewed={this.setLeague}
										/>
									</div>
								</div>
							)
						}
					</Media>

				</div>
			</div>
		);
	}
}

export default withRouter(Team);
