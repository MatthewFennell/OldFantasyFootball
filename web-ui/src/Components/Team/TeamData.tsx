import * as React from 'react';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { MostValuable } from '../../Models/Interfaces/MostValuable';
import { getNumberOfWeeks, getTransferStatus } from '../../Services/Weeks/WeeksService';
import {
	getTeamForUserInWeek,
	getPlayersWithMostPointsInWeek,
	getMostValuableAssets
} from '../../Services/Player/PlayerService';
import {
	getAveragePoints,
	// getPointsForUserInWeek,
	getUsersWithMostPointsInWeek
} from '../../Services/Points/PointsService';
import { getCollegeTeams } from '../../Services/CollegeTeam/CollegeTeamService';
import { getRemainingBudget } from '../../Services/User/UserService';
import {
	getLeaguesAndPositions
} from '../../Services/League/LeagueService';

interface TransactionsProps {
  weekBeingViewed: number;
  setWeekBeingViewed: (week: number) => void;
  averageWeeklyPointsCache: any;
  addToAverageWeeklyPointsCache: (id: number, points: number) => void;
  topWeeklyPlayerCache: any;
  addToTopWeeklyPlayersCache: (id: number, player: PlayerDTO) => void;
  topWeeklyUsersCache: any;
  addToTopWeeklyUsersCache: (id: number, player: TopWeeklyUser) => void;

  leagueCache: any;
  addToLeagueCache: (leagueName: string, position: number) => void;

  setTeam: (team: PlayerDTO[]) => void;
  weeklyTeamCache: any;
  addToWeeklyTeamCache: (id: number, team: PlayerDTO[]) => void;
  setTotalNumberOfWeeks: (numberOfWeeks: number) => void;
  setTransferMarket: (transferMarket: boolean) => void;
  setAllCollegeTeams: (teams: CollegeTeam[]) => void;
  allCollegeTeams: CollegeTeam[];
  setRemainingBudget: (budget: number) => void;
  setMostValuable: (mostValuable: MostValuable) => void;
}

class Transactions extends React.Component<TransactionsProps> {
	constructor (props: TransactionsProps) {
		super(props);
		this._generateCache = this._generateCache.bind(this);
	}

	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = false;
		}
		this.props.setWeekBeingViewed(-1);

		getLeaguesAndPositions().then(leagueAndPositionsArray => {
			for (let x = 0; x < leagueAndPositionsArray.length; x++) {
				if (this.props.leagueCache[leagueAndPositionsArray[x].leagueName] === undefined) {
					this.props.addToLeagueCache(
						leagueAndPositionsArray[x].leagueName,
						leagueAndPositionsArray[x].position
					);
				}
			}
		});

		getMostValuableAssets().then(mostValuable => {
			this.props.setMostValuable(mostValuable);
		});

		// Get the total number of weeks
		getNumberOfWeeks().then(currentWeek => {
			this.props.setTotalNumberOfWeeks(currentWeek);

			for (let x = 0; x <= currentWeek; x++) {
				this._generateCache(x);
			}

			getTeamForUserInWeek(this.props.weekBeingViewed).then(activeTeam => {
				this.props.setTeam(activeTeam);
			});

			getRemainingBudget().then(response => {
				this.props.setRemainingBudget(response);
			});
		});

		getTransferStatus().then(response => {
			this.props.setTransferMarket(response);
		});

		if (this.props.allCollegeTeams.length === 0) {
			getCollegeTeams('alphabetical').then(response => {
				this.props.setAllCollegeTeams(response);
			});
		}

		if (this.props.weeklyTeamCache[-1] === undefined) {
			getTeamForUserInWeek(-1).then(weeklyTeam => {
				this.props.addToWeeklyTeamCache(-1, weeklyTeam);
			});
		}
	}

	_generateCache (currentWeek: number) {
		// Hold a cache of [Week -> Weekly Team]
		if (this.props.weeklyTeamCache[currentWeek] === undefined) {
			getTeamForUserInWeek(currentWeek).then(weeklyTeam => {
				this.props.addToWeeklyTeamCache(currentWeek, weeklyTeam);
			});
		}

		// Hold a cache of [Week -> Average Weekly Points]
		// If not cached, add to it
		if (this.props.averageWeeklyPointsCache[currentWeek] === undefined) {
			getAveragePoints(currentWeek).then(averageWeeklyPoints => {
				this.props.addToAverageWeeklyPointsCache(currentWeek, averageWeeklyPoints);
			});
		}

		// Top weekly player cache
		if (this.props.topWeeklyPlayerCache[currentWeek] === undefined) {
			getPlayersWithMostPointsInWeek(currentWeek).then(playerMostPoints => {
				this.props.addToTopWeeklyPlayersCache(currentWeek, playerMostPoints);
			});
		}

		// Top weekly user cache
		if (this.props.topWeeklyUsersCache[currentWeek] === undefined) {
			getUsersWithMostPointsInWeek(currentWeek).then(userMostPoints => {
				this.props.addToTopWeeklyUsersCache(currentWeek, userMostPoints);
			});
		}
	}

	render () {
		return (
			null
		);
	}
}

export default Transactions;
