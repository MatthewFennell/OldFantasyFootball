import * as React from 'react';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { getNumberOfWeeks, getTransferStatus } from '../../Services/Weeks/WeeksService';
import {
	getPlayersWithMostPointsInWeek,
} from '../../Services/Player/PlayerService';
import {
	getAveragePoints,
	getUsersWithMostPointsInWeek
} from '../../Services/Points/PointsService';
import { getCollegeTeams } from '../../Services/CollegeTeam/CollegeTeamService';

interface TransactionsProps {
  weekBeingViewed: number;
  setWeekBeingViewed: (week: number) => void;
  averageWeeklyPoints: any;
  addToAverageWeeklyPoints: (id: number, points: number) => void;
  topWeeklyPlayer: any;
  addToTopWeeklyPlayers: (id: number, player: PlayerDTO) => void;
  topWeeklyUsers: any;
  addToTopWeeklyUsers: (id: number, player: TopWeeklyUser) => void;

  setTotalNumberOfWeeks: (numberOfWeeks: number) => void;
  setTransferMarket: (transferMarket: boolean) => void;
  setAllCollegeTeams: (teams: CollegeTeam[]) => void;
  allCollegeTeams: CollegeTeam[];

  userBeingViewed: string;

}

class Transactions extends React.Component<TransactionsProps> {
	constructor (props: TransactionsProps) {
		super(props);
		this._generate = this._generate.bind(this);
	}

	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = false;
		}
		this.props.setWeekBeingViewed(-1);

		// Get the total number of weeks
		getNumberOfWeeks().then(currentWeek => {
			this.props.setTotalNumberOfWeeks(currentWeek);

			for (let x = 0; x <= currentWeek; x++) {
				this._generate(x);
			}
		});

		getTransferStatus().then(response => {
			this.props.setTransferMarket(response);
		});

		if (this.props.allCollegeTeams.length === 0) {
			getCollegeTeams('alphabetical').then(response => {
				this.props.setAllCollegeTeams(response);
			});
		}
	}

	_generate (currentWeek: number) {
		// Hold a  of [Week -> Average Weekly Points]
		// If not d, add to it
		if (this.props.averageWeeklyPoints[currentWeek] === undefined) {
			getAveragePoints(currentWeek).then(averageWeeklyPoints => {
				this.props.addToAverageWeeklyPoints(currentWeek, averageWeeklyPoints);
			});
		}

		// Top weekly player
		if (this.props.topWeeklyPlayer[currentWeek] === undefined) {
			getPlayersWithMostPointsInWeek(currentWeek).then(playerMostPoints => {
				this.props.addToTopWeeklyPlayers(currentWeek, playerMostPoints);
			});
		}

		// Top weekly user
		if (this.props.topWeeklyUsers[currentWeek] === undefined) {
			getUsersWithMostPointsInWeek(currentWeek).then(userMostPoints => {
				this.props.addToTopWeeklyUsers(currentWeek, userMostPoints);
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
