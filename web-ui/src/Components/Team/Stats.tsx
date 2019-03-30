import * as React from 'react';
import '../../Style/Team/Stats.css';
import { MostValuable } from '../../Models/Interfaces/MostValuable';
import { getUserBudget } from '../../Services/User/UserService';

interface StatsProps {
  averageWeeklyPointsCache: any;
  topWeeklyPlayerCache: any;
  weekBeingViewed: number;
  topWeeklyUsersCache: any;
  mostValuable: MostValuable;

  userBeingViewed: string
  remainingBudget: { user: { id: string; budget: number } }
  setBudget: (user: string, budget:number) => void;
}

class Stats extends React.Component<StatsProps> {
	constructor (props: StatsProps) {
		super(props);
		this.setBudget = this.setBudget.bind(this);

		this.setBudget();
	}

	shouldComponentUpdate () {
		return true;
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			this.setBudget();
		}
	}

	setBudget () {
		getUserBudget(this.props.userBeingViewed).then(response => {
			this.props.setBudget(this.props.userBeingViewed, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	render () {
		const {
			averageWeeklyPointsCache,
			weekBeingViewed,
			topWeeklyPlayerCache,
			topWeeklyUsersCache,
			mostValuable,
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

				{topWeeklyPlayerCache[weekBeingViewed] !== undefined ? (
					<div className="player-most-points">
            Player of the Week : {topWeeklyPlayerCache[weekBeingViewed].firstName}{' '}
						{topWeeklyPlayerCache[weekBeingViewed].surname} (
						{topWeeklyPlayerCache[weekBeingViewed].points} points)
					</div>
				) : weekBeingViewed === -1 && mostValuable !== undefined ? (
					<div className="player-most-points">
            Your most valuable player is {mostValuable.mostValuablePlayer.firstName}{' '}
						{mostValuable.mostValuablePlayer.surname} with {mostValuable.mostValuablePlayerScore}{' '}
            points{' '}
					</div>
				) : null}

				{topWeeklyUsersCache[weekBeingViewed] !== undefined ? (
					<div className="user-most-points">
            Team of the Week : {topWeeklyUsersCache[weekBeingViewed].firstName}{' '}
						{topWeeklyUsersCache[weekBeingViewed].surname} (
						{topWeeklyUsersCache[weekBeingViewed].points} points )
					</div>
				) : weekBeingViewed === -1 && mostValuable !== undefined ? (
					<div className="player-most-points">
            Your most valuable college team is {mostValuable.mostValuableCollegeTeam.name} with{' '}
						{mostValuable.mostValuableCollegeTeamScore} points
					</div>
				) : null}
			</div>
		);
	}
}
export default Stats;
