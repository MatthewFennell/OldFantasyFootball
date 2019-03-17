/* eslint-disable react/destructuring-assignment */
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

interface TransactionsProps {
  totalPoints: number;
  weekBeingViewed: number;
  averageWeeklyPointsCache: any;
  weeklyPointsCache: any;
  topWeeklyPlayerCache: any;
  topWeeklyUsersCache: any;
  leagueCache: any;
  activeTeam: PlayerDTO[];
  weeklyTeamCache: any;
  allCollegeTeams: CollegeTeam[];
  mostValuable: MostValuable;
}

interface TeamState {
	playerStatsBeingViewed: PlayerStatsDTO;
	statsBeingViewed: boolean;
	playerPointsBeingViewed: PlayerPointsDTO;
	playerPointsViewed: boolean;
}

class Transactions extends React.Component<TransactionsProps, TeamState> {
	constructor (props: TransactionsProps) {
		super(props);
		this.handleClickOnPlayer = this.handleClickOnPlayer.bind(this);
		this.state = {
			playerStatsBeingViewed: {} as any,
			statsBeingViewed: false,
			playerPointsBeingViewed: {} as any,
			playerPointsViewed: false
		};
	}

	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = false;
		}
	}

	handleClickOnPlayer (player: PlayerDTO) {
		let playerStats: PlayerStatsDTO = {
			firstName: player.firstName,
			surname: player.surname,
			position: player.position,
			points: player.points,
			price: player.price,
			totalGoals: player.totalGoals,
			totalAssists: player.totalAssists
		};

		this.setState({ statsBeingViewed: true, playerStatsBeingViewed: playerStats });

		getPlayerStatsForWeek(this.props.weekBeingViewed, player.id).then(response => {
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
						Player stats
						<PlayerStats
							playerPointsBeingViewed={this.state.playerPointsBeingViewed}
							playerPointsViewed={this.state.playerPointsViewed}
							playerStatsBeingViewed={this.state.playerStatsBeingViewed}
							statsBeingViewed={this.state.statsBeingViewed}
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
						My Leagues
						<div className="league-table">
							<LeagueTableBody
								leagues={leagues}
								setLeagueBeingViewed={() => {}}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Transactions;
