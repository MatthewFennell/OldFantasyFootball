import * as React from 'react';
import '../../Style/Team/Team.css';
import '../../Style/Team/PitchLayout/Pitch.css';
import Info from '../../Containers/Team/Info';
import Stats from '../../Containers/Team/Stats';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { MostValuable } from '../../Models/Interfaces/MostValuable';
import Pitch from './PitchLayout/Pitch';
import TeamData from '../../Containers/Team/TeamData';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueTableBody from '../Leagues/LeagueTableBody';
import PlayerStats from './PlayerStats';
import { getPlayerStatsForWeek } from '../../Services/Player/PlayerService';
import { PlayerStatsDTO } from './PlayerStatsType';
import { PlayerPointsDTO } from './PlayerPointsType';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import {
	getPositionsOfUsersInLeague, getLeagueAdmin
} from '../../Services/League/LeagueService';
import { UserLeaguePosition } from '../..//Models/Interfaces/UserLeaguePosition';
import { getUserInfo } from '../../Services/User/UserService';

interface TransactionsProps {
  weekBeingViewed: number;
  averageWeeklyPointsCache: any;
  topWeeklyPlayerCache: any;
  topWeeklyUsersCache: any;
  leagueCache: any;
  activeTeam: PlayerDTO[];
  weeklyTeamCache: any;
  allCollegeTeams: CollegeTeam[];
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

  setTeamCache: (user: string, week: number, team: PlayerDTO[]) => void;

}

interface TeamState {
	playerStatsBeingViewed: PlayerStatsDTO;
	statsBeingViewed: boolean;
	playerPointsBeingViewed: PlayerPointsDTO;
	playerPointsViewed: boolean;
	playerSidebar: PlayerDTO;
	weekBeingViewed: number;

	usernameBeingViewed: string;
}

class Transactions extends React.Component<RoutedFormProps<RouteComponentProps> & TransactionsProps, TeamState> {
	constructor (props: RoutedFormProps<RouteComponentProps> & TransactionsProps) {
		super(props);
		this.handleClickOnPlayer = this.handleClickOnPlayer.bind(this);
		this.onHandleWeek = this.onHandleWeek.bind(this);
		this.setLeague = this.setLeague.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.state = {
			playerStatsBeingViewed: {} as any,
			statsBeingViewed: false,
			playerPointsBeingViewed: {} as any,
			playerPointsViewed: false,
			playerSidebar: {} as any,
			weekBeingViewed: this.props.totalNumberOfWeeks,
			usernameBeingViewed: ''
		};
		this.updateUserInfo();
		this.props.setTeamCache('a', 5, []);
	}

	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = false;
		}
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			this.updateUserInfo();
		}
	}

	updateUserInfo () {
		getUserInfo(this.props.userBeingViewed).then(response => {
			this.setState({ usernameBeingViewed: response.firstName + ' ' + response.surname });
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

	render () {
		let leagues: LeaguePositions[] = [];
		var keys = Object.keys(this.props.leagueCache);
		for (let x = 0; x < keys.length; x++) {
			// TO:DO - Check this
			let p: LeaguePositions = {
				leagueName: keys[x],
				position: this.props.leagueCache[keys[x]],
				id: this.props.leagueCache[keys[x]]
			};
			leagues.push(p);
		}
		return (
			<div className="outer-rows">
				<TeamData />
				<div className="row-1-info">
					<Info />
				</div>
				<div className="row-2-stats">
					<Stats />
				</div>
				<div className="row-3-squad">

					<div className="player-stats">
						<PlayerStats
							handleWeek={this.onHandleWeek}
							playerPointsBeingViewed={this.state.playerPointsBeingViewed}
							playerPointsViewed={this.state.playerPointsViewed}
							playerStatsBeingViewed={this.state.playerStatsBeingViewed}
							statsBeingViewed={this.state.statsBeingViewed}
							totalNumberOfWeeks={this.props.totalNumberOfWeeks}
							userBeingViewed={this.props.userBeingViewed}
							username={this.state.usernameBeingViewed}
							weekBeingViewed={this.state.weekBeingViewed}
						/>
					</div>

					<Pitch
						activeWeeklyTeam={this.props.activeTeam}
						addOrRemovePlayer={() => {}}
						handleClickOnPlayer={this.handleClickOnPlayer}
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

export default withRouter(Transactions);
