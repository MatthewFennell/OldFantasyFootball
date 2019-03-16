import * as React from 'react';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';
import RankingsRow from './RankingsRow';
import '../../Style/League/Rankings.css';
import { Col } from 'react-bootstrap';

interface RankingsTableBodyProps {
	code: string;
	isAdmin: boolean;
  leagueRankings: UserLeaguePosition[];
}

const RankingsTableBody: React.SFC<RankingsTableBodyProps> = (props) => {
	const { leagueRankings } = props;
	return (
		<Col
			className="league-info-screen"
			lg={6}
			md={6}
			xs={6}
		>
			{props.isAdmin ? (
				<div>You are the admin of this league. The code for joining is {props.code} </div>
			) : (
				<div>The admin of this league is {props.code} </div>
			)}
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
						handleRowClick={() => {}}
						key={datum.position}
					/>
				))}
			</tbody>
		</Col>
	);
};

RankingsTableBody.defaultProps = {
	leagueRankings: []
};

export default RankingsTableBody;
