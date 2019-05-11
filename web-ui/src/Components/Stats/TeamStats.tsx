import * as React from 'react';
import '../../Style/Stats/TeamStats.css';
import { SingleHistory } from '../../Models/Interfaces/SingleHistory';
import classnames from 'classnames';

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
					<div className="stats-goalscorers-title">Goals</div>
					{props.goalScorers.map((goalScorer, index) => (
						<div
							className={classnames({
								goalScorerRow: true,
								goalScorerEven: index % 2 !== 0,
								goalScorerOdd: index % 2 === 0
							})}
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
					{props.assists.map((assist, index) => (
						<div
							className={classnames({
								assistRow: true,
								assistEven: index % 2 !== 0,
								assistOdd: index % 2 === 0
							})}
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
