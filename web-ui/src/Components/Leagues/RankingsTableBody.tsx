import * as React from 'react';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';
import RankingsRow from './RankingsRow';
import '../../Style/League/Rankings.css';

interface RankingsTableBodyProps {
  leagueRankings: UserLeaguePosition[];
}

const RankingsTableBody: React.SFC<RankingsTableBodyProps> = (props) => {
	// eslint-disable-next-line react/prop-types
	const { leagueRankings } = props;
	return (
		<tbody className="league-rankings">
			<tr
				className="rankings"
				key="header"
			>
				<td className="user-name">Name</td>
				<td className="points">Points</td>
				<td className="position">Position</td>
			</tr>
			{leagueRankings.map(datum => (
				<RankingsRow
					element={datum}
					key={datum.position}
				/>
			))}
		</tbody>
	);
};

RankingsTableBody.defaultProps = {
	leagueRankings: []
};

export default RankingsTableBody;
