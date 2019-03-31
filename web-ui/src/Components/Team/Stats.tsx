import * as React from 'react';
import '../../Style/Team/Stats.css';
import { MostValuable } from '../../Models/Interfaces/MostValuable';
import { getUserBudget } from '../../Services/User/UserService';
import { getMostValuableAssets } from '../../Services/Player/PlayerService';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';

interface StatsProps {
  averageWeeklyPoints: any;
  topWeeklyPlayer: any;
  weekBeingViewed: number;
  topWeeklyUsers: any;
  totalNumberOfWeeks: number;

  userBeingViewed: string
  remainingBudget: { user: { id: string; budget: number } }
  setBudget: (user: string, budget:number) => void;
  setMostValuable: (user: string, mostValuable: MostValuable) => void;
  setUserBeingViewed: (user: string) => void;
  mostValuable: { user: { id: string; mostValuable: MostValuable } }

}

class Stats extends React.Component<StatsProps> {
	constructor (props: StatsProps) {
		super(props);
		this.setBudget = this.setBudget.bind(this);
		this.findMostValuable = this.findMostValuable.bind(this);
		this.handleViewTeamOfTheWeek = this.handleViewTeamOfTheWeek.bind(this);

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
			this.props.setMostValuable(this.props.userBeingViewed, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	handleViewTeamOfTheWeek () {
		const week: number = this.props.weekBeingViewed === -1 ? this.props.totalNumberOfWeeks : this.props.weekBeingViewed;
		const teamOfTheWeekId : TopWeeklyUser = this.props.topWeeklyUsers[week];
		this.props.setUserBeingViewed(teamOfTheWeekId.id);
	}

	render () {
		const week = this.props.weekBeingViewed === -1 ? this.props.totalNumberOfWeeks : this.props.weekBeingViewed;

		const mostValuablePlayer : PlayerDTO = this.props.mostValuable[this.props.userBeingViewed] !== undefined
			? this.props.mostValuable[this.props.userBeingViewed]['mostValuablePlayer'] : null;

		const mostValuableTeam : CollegeTeam = this.props.mostValuable[this.props.userBeingViewed] !== undefined
			? this.props.mostValuable[this.props.userBeingViewed]['mostValuableCollegeTeam'] : null;

		const topWeeklyPlayer : PlayerDTO = this.props.topWeeklyPlayer[week] !== undefined
			? this.props.topWeeklyPlayer[week] : null;

		const topWeeklyTeam : TopWeeklyUser = this.props.topWeeklyUsers[week] !== undefined
			? this.props.topWeeklyUsers[week] : null;

		const {
			averageWeeklyPoints,
			weekBeingViewed,
		} = this.props;

		return (
			<div className="stats-columns">
				<div className="average-points">
					{weekBeingViewed === -1 ? (
						<div>Remaining Budget : £{this.props.remainingBudget[this.props.userBeingViewed]}  mil </div>
					) : (
						<div> Average Points: {averageWeeklyPoints[weekBeingViewed]}</div>
					)}
				</div>

				{mostValuablePlayer !== null
					? <div className="player-most-points">
					Your most valuable player is {mostValuablePlayer.firstName + ' ' + mostValuablePlayer.surname}  {' '}
					with {this.props.mostValuable[this.props.userBeingViewed]['mostValuablePlayerScore']}   points</div>
					 : null}

				{mostValuableTeam !== null
					? <div className="player-most-points">
					Your most valuable team is {mostValuableTeam.name}  with {' '}
						{this.props.mostValuable[this.props.userBeingViewed]['mostValuableCollegeTeamScore']} points</div>
					 : null}

				{topWeeklyPlayer !== null
					? <div className="player-most-points"> Player of the Week :
						{topWeeklyPlayer.firstName}{' '}{topWeeklyPlayer.surname}{' '}
						({topWeeklyPlayer.points} points) </div> : null}

				{topWeeklyTeam !== null
					? <div
						className="player-most-points"
						onClick={this.handleViewTeamOfTheWeek}
					  > Team of the Week :
						{topWeeklyTeam.firstName}{' '}{topWeeklyTeam.surname}{' '}
						({topWeeklyTeam.points} points) </div> : null}

			</div>
		);
	}
}
export default Stats;
