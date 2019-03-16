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

interface TransactionsProps {
  totalPoints: number;
  weekBeingViewed: number;
  averageWeeklyPointsCache: any;
  weeklyPointsCache: any;
  topWeeklyPlayerCache: any;
  topWeeklyUsersCache: any;
  activeTeam: PlayerDTO[];
  weeklyTeamCache: any;
  allCollegeTeams: CollegeTeam[];
  mostValuable: MostValuable;
}

class Transactions extends React.Component<TransactionsProps> {
	componentDidMount () {
		let header: HTMLElement | null = document.getElementById('header');
		if (header != null) {
			header.hidden = false;
		}
	}

	render () {
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
					<Pitch
						activeWeeklyTeam={this.props.activeTeam}
						addOrRemovePlayer={() => {}}
						removeFromActiveTeam={() => {}}
						transfer={false}
					/>
				</div>
			</div>
		);
	}
}

export default Transactions;
