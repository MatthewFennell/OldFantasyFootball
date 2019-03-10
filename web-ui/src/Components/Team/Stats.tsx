import * as React from 'react';
import '../../Style/Team/Stats.css';
import { MostValuable } from '../../Models/Interfaces/MostValuable';

interface StatsProps {
  averageWeeklyPointsCache: any;
  topWeeklyPlayerCache: any;
  weekBeingViewed: number;
  topWeeklyUsersCache: any;
  remainingBudget: number;
  mostValuable: MostValuable;
}

interface StatsState {}

class Stats extends React.Component<StatsProps, StatsState> {
	componentDidMount () {}

	shouldComponentUpdate () {
		return false;
	}

	render () {
		const {
			averageWeeklyPointsCache,
			weekBeingViewed,
			topWeeklyPlayerCache,
			topWeeklyUsersCache,
			mostValuable,
			remainingBudget
		} = this.props;

		return (
			<div className="stats-columns">
				<div className="average-points">
					{weekBeingViewed === -1 ? (
						<div>Remaining Budget : {remainingBudget} mil </div>
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
