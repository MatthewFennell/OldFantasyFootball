import * as React from 'react';
import '../../Style/Team/Stats.css';
import { MostValuable } from '../../Models/Interfaces/MostValuable';
import { getUserBudget } from '../../Services/User/UserService';
import { getMostValuableAssets } from '../../Services/Player/PlayerService';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';

interface StatsProps {
  averageWeeklyPointsCache: any;
  topWeeklyPlayerCache: any;
  weekBeingViewed: number;
  topWeeklyUsersCache: any;
  totalNumberOfWeeks: number;

  userBeingViewed: string
  remainingBudget: { user: { id: string; budget: number } }
  setBudget: (user: string, budget:number) => void;
  setMostValuableCache: (user: string, mostValuable: MostValuable) => void;
  mostValuableCache: { user: { id: string; mostValuable: MostValuable } }
}

class Stats extends React.Component<StatsProps> {
	constructor (props: StatsProps) {
		super(props);
		this.setBudget = this.setBudget.bind(this);
		this.findMostValuable = this.findMostValuable.bind(this);

		this.setBudget();
		this.findMostValuable();
	}

	shouldComponentUpdate () {
		return true;
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			this.setBudget();
			this.findMostValuable();
		}
	}

	setBudget () {
		getUserBudget(this.props.userBeingViewed).then(response => {
			this.props.setBudget(this.props.userBeingViewed, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	findMostValuable () {
		getMostValuableAssets(this.props.userBeingViewed).then(response => {
			this.props.setMostValuableCache(this.props.userBeingViewed, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	render () {
		const week = this.props.weekBeingViewed === -1 ? this.props.totalNumberOfWeeks : this.props.weekBeingViewed;

		const mostValuablePlayer : PlayerDTO = this.props.mostValuableCache[this.props.userBeingViewed] !== undefined
			? this.props.mostValuableCache[this.props.userBeingViewed]['mostValuablePlayer'] : null;

		const mostValuableTeam : CollegeTeam = this.props.mostValuableCache[this.props.userBeingViewed] !== undefined
			? this.props.mostValuableCache[this.props.userBeingViewed]['mostValuableCollegeTeam'] : null;

		const topWeeklyPlayer : PlayerDTO = this.props.topWeeklyPlayerCache[week] !== undefined
			? this.props.topWeeklyPlayerCache[week] : null;

		const topWeeklyTeam : TopWeeklyUser = this.props.topWeeklyUsersCache[week] !== undefined
			? this.props.topWeeklyUsersCache[week] : null;

		const {
			averageWeeklyPointsCache,
			weekBeingViewed,
		} = this.props;

		return (
			<div className="stats-columns">
				<div className="average-points">
					{weekBeingViewed === -1 ? (
						<div>Remaining Budget : £{this.props.remainingBudget[this.props.userBeingViewed]}  mil </div>
					) : (
						<div> Average Points: {averageWeeklyPointsCache[weekBeingViewed]}</div>
					)}
				</div>

				{mostValuablePlayer !== null
					? <div className="player-most-points">
					Your most valuable player is {mostValuablePlayer.firstName + ' ' + mostValuablePlayer.surname}  {' '}
					with {this.props.mostValuableCache[this.props.userBeingViewed]['mostValuablePlayerScore']}   points</div>
					 : null}

				{mostValuableTeam !== null
					? <div className="player-most-points">
					Your most valuable team is {mostValuableTeam.name}  with {' '}
						{this.props.mostValuableCache[this.props.userBeingViewed]['mostValuableCollegeTeamScore']} points</div>
					 : null}

				{topWeeklyPlayer !== null
					? <div className="player-most-points"> Player of the Week :
						{topWeeklyPlayer.firstName}{' '}{topWeeklyPlayer.surname}{' '}
						({topWeeklyPlayer.points} points) </div> : null}

				{topWeeklyTeam !== null
					? <div className="player-most-points"> Team of the Week :
						{topWeeklyTeam.firstName}{' '}{topWeeklyTeam.surname}{' '}
						({topWeeklyTeam.points} points) </div> : null}

			</div>
		);
	}
}
export default Stats;
