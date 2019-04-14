import * as React from 'react';
import '../../Style/Stats/TeamStats.css';
import { SingleHistory } from '../../Models/Interfaces/SingleHistory';

interface TeamStatsProps {
    teamName: string;
    goalScorers: SingleHistory[];
    assists: SingleHistory[];
}

const TeamStats: React.SFC<TeamStatsProps> = (props) => {
	return (
		<div className="team-stats-wrapper">
			<div className="stats-teamname">
                Team : {props.teamName}
			</div>

			<div className="goals-assists-stats-wrapper">

				<div className="stats-team-goalscorers">
					<div className="stats-goalscorers-title">Goalscorers</div>
					{props.goalScorers.map(goalScorer => (
						<div
							className="goalscorer-row"
							key={goalScorer.firstname + goalScorer.surname}
						>

							<div className="goalscorer-name">
								{goalScorer.firstname}{' '}{goalScorer.surname}
							</div>
							<div className="goalscorer-amount">
								{goalScorer.amount}
							</div>

						</div>
					))}
				</div>

				<div className="stats-team-assist">
					<div className="stats-assist-title">Assists</div>
					{props.assists.map(assist => (
						<div
							className="assist-row"
							key={assist.firstname + assist.surname}
						>

							<div className="assist-name">
								{assist.firstname}{' '}{assist.surname}
							</div>
							<div className="assist-amount">
								{assist.amount}
							</div>

						</div>
					))}
				</div>
			</div>

		</div>
	);
};

export default TeamStats;
