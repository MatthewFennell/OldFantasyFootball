/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { PlayerStatsDTO } from './PlayerStatsType';
import { PlayerPointsDTO } from './PlayerPointsType';

interface PlayerStatsProps {
    playerStatsBeingViewed: PlayerStatsDTO;
    playerPointsViewed: boolean;
    playerPointsBeingViewed: PlayerPointsDTO;
    statsBeingViewed: boolean;
}

// eslint-disable-next-line react/require-optimization
class PlayerStats extends React.Component<PlayerStatsProps, {}> {
	render () {
		let totalStats: JSX.Element[] = [];

		let info: String[] = ['First name', 'Surname', 'Position', 'Total points', 'Price', 'Total Goals', 'Total Assists'];
		let index: number = -1;

		for (const [key, value] of Object.entries(this.props.playerStatsBeingViewed)) {
			index += 1;
			totalStats.push(<tr
				className="player-stats"
				key={key}
			                >
				<td className="stat-title">{info[index]}</td>
				<td className="stat-value">{value}</td>
			</tr>);
		  }

		totalStats.push(<hr />);
		let weeklyStats: JSX.Element[] = [];
		let weeklyInfo: String[] = ['Weekly Goals', 'Weekly Assists', 'Man of the Match', 'Yellow Cards', 'Red Card', 'Week'];
		let weeklyIndex:number = -1;
		for (const [key, value] of Object.entries(this.props.playerPointsBeingViewed)) {
			weeklyIndex += 1;
			totalStats.push(<tr
				className="player-stats"
				key={key}
			                >
				<td className="stat-title">{weeklyInfo[weeklyIndex]}</td>
				<td className="stat-value">{value}</td>
			</tr>);
		  }

		return (
			<div
				className="player-stats-sidebar"
			>
				{this.props.statsBeingViewed ? (<table><tbody> {totalStats} </tbody></table>) : (<div> No </div>)}

				{this.props.playerPointsViewed ? (<table><tbody> {weeklyStats} </tbody></table>) : (<div> No </div>)}
			</div>
		);
	}
}

export default PlayerStats;
