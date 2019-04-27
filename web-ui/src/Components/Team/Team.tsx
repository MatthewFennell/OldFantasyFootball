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
import { getPlayerStatsForWeek, getTeamForUserInWeek, getMostValuableAssets } from '../../Services/Player/PlayerService';
import { PlayerStatsDTO } from './PlayerStatsType';
import { PlayerPointsDTO } from '../../Models/Interfaces/PlayerPointsType';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import {
	getPositionsOfUsersInLeague, getLeagueAdmin, getLeaguesAndPositions
} from '../../Services/League/LeagueService';
import { UserLeaguePosition } from '../..//Models/Interfaces/UserLeaguePosition';
import { getUserInfo } from '../../Services/User/UserService';

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
		this.findMostValuable = this.findMostValuable.bind(this);
		this.findLeagues = this.findLeagues.bind(this);
		this.generateLeaguePositions = this.generateLeaguePositions.bind(this);
		this.generateRowClassName = this.generateRowClassName.bind(this);
		this.findAllTeams = this.findAllTeams.bind(this);
		this.state = {
			playerStatsBeingViewed: {} as any,
			statsBeingViewed: false,
			playerPointsBeingViewed: {} as any,
			playerPointsViewed: false,
			playerSidebar: {} as any,
			weekBeingViewed: this.props.totalNumberOfWeeks,
			usernameBeingViewed: '',
			teamNameBeingViewed: ''
		};
		this.updateUserInfo();
		this.findLeagues();
		this.findAllTeams(0);
	}

	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = false;
		}
		this.findAllTeams(0);
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			this.updateUserInfo();
			this.findLeagues();
			this.findAllTeams(0);
		}

		if (prevProps.totalNumberOfWeeks !== this.props.totalNumberOfWeeks) {
			this.findAllTeams(this.props.totalNumberOfWeeks);
		}
	}

	findAllTeams (numberOfWeeks: number) {
		for (let week = -1; week <= numberOfWeeks; week++) {
			try {
				if (this.props.team[this.props.userBeingViewed][week] === undefined) {
					getTeamForUserInWeek(this.props.userBeingViewed, week).then(response => {
						this.props.setTeam(this.props.userBeingViewed, week, response);
					}).catch(error => {
						console.log('error = ' + error);
					});
				}
			} catch (error) {
				getTeamForUserInWeek(this.props.userBeingViewed, week).then(response => {
					this.props.setTeam(this.props.userBeingViewed, week, response);
				}).catch(error => {
					console.log('error = ' + error);
				});
			}
		}
	}

	findMostValuable () {
		getMostValuableAssets(this.props.userBeingViewed).then(response => {
			this.props.setMostValuable(this.props.userBeingViewed, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	findLeagues () {
		console.log('user is ' + this.props.userBeingViewed);
		if (this.props.userBeingViewed !== '') {
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
		getUserInfo(this.props.userBeingViewed).then(response => {
			this.setState({ usernameBeingViewed: response.firstName + ' ' + response.surname });
			this.setState({ teamNameBeingViewed: response.teamName });
		}).catch(error => {
			console.log('error = ' + error);
		});
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
			.catch(error => {
				console.log('failure - ' + error);
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
			.catch(error => {
				console.log('failure - ' + error);
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
		this.generateLeaguePositions();
		let teamToRender = this.props.team[this.props.userBeingViewed] !== undefined &&
		this.props.team[this.props.userBeingViewed][this.props.weekBeingViewed] !== undefined
			? this.props.team[this.props.userBeingViewed][this.props.weekBeingViewed] : [];

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
				<div className={this.generateRowClassName()}>

					<div className="player-stats">
						<PlayerStats
							handleWeek={this.onHandleWeek}
							playerPointsBeingViewed={this.state.playerPointsBeingViewed}
							playerPointsViewed={this.state.playerPointsViewed}
							playerStatsBeingViewed={this.state.playerStatsBeingViewed}
							statsBeingViewed={this.state.statsBeingViewed}
							teamName={this.state.teamNameBeingViewed}
							totalNumberOfWeeks={this.props.totalNumberOfWeeks}
							userBeingViewed={this.props.userBeingViewed}
							username={this.state.usernameBeingViewed}
							weekBeingViewed={this.state.weekBeingViewed}
						/>
					</div>

					<Pitch
						activeWeeklyTeam={teamToRender}
						addOrRemovePlayer={() => {}}
						handleClickOnPlayer={this.handleClickOnPlayer}
						noPoints={this.props.weekBeingViewed === -1}
						removeFromActiveTeam={() => {}}
						transfer={false}
					/>

					<div className="leagues-team">
						<div className="league-table">
							<LeagueTableBody
								leagues={leagues}
								setLeagueBeingViewed={this.setLeague}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Team);
