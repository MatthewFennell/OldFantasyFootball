import * as React from 'react';
import '../../Style/Team/Stats.css';
import { MostValuable } from '../../Models/Interfaces/MostValuable';
import { getUserBudget } from '../../Services/User/UserService';
import { getMostValuableAssets } from '../../Services/Player/PlayerService';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';

interface StatsProps {
  weekBeingViewed: number;
  topWeeklyUsers: any;
  totalNumberOfWeeks: number;

  userBeingViewed: string
  remainingBudget: { user: { id: string; budget: number } }
  setBudget: (user: string, budget:number) => void;
  setMostValuable: (user: string, mostValuable: MostValuable) => void;
  setUserBeingViewed: (user: string) => void;
  mostValuable: { user: { id: string; mostValuable: MostValuable } }

  mostValuablePlayerName: string;
  mostValuablePlayerScore: number;
  topWeeklyPlayerName: string;
  topWeeklyPlayerPoints: number;
  topWeeklyUserName: string;
  topWeeklyUserPoints: number;

  remainingBudgetOfUser: number;
  averageWeeklyPointsOfWeek: number;
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
		const {
			weekBeingViewed,
		} = this.props;

		return (
			<div className="stats-columns">
				<div className="average-points">
					{weekBeingViewed === -1 ? (
						<div>Remaining Budget: £{this.props.remainingBudgetOfUser}  mil </div>
					) : (
						<div> Average Points: {this.props.averageWeeklyPointsOfWeek.toFixed(0)}</div>
					)}
				</div>

				<div className="player-most-points">
					Your most valuable player is {this.props.mostValuablePlayerName}{' '} with {this.props.mostValuablePlayerScore} points
				</div>

				<div className="player-most-points">
					Player of the Week: {' '}{this.props.topWeeklyPlayerName} ({this.props.topWeeklyPlayerPoints} points)
				</div>

				 <div
					className="player-most-points"
					onClick={this.handleViewTeamOfTheWeek}
				 >
				 Team of the Week:
					{' '}{this.props.topWeeklyUserName} ({this.props.topWeeklyUserPoints} points)
				</div>

			</div>
		);
	}
}
export default Stats;
