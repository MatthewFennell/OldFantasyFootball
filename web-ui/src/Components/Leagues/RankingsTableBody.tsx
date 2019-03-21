import * as React from 'react';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';
import RankingsRow from './RankingsRow';
import '../../Style/League/Rankings.css';
import { Col } from 'react-bootstrap';

interface RankingsTableBodyProps {
	code: string;
	isAdmin: boolean;
  leagueRankings: UserLeaguePosition[];
  leagueBeingViewed: string;
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
			<div className="rankings-wrapper">
				{/* {props.isAdmin ? (
					<div>You are the admin of this league. The code for joining is {props.code} </div>
				) : (
					<div>The admin of this league is {props.code} </div>
				)} */}
				<div className="current-league-name">
					League: { props.leagueBeingViewed}
				</div>
				<table className="my-active-leagues-table">
					<thead>
						<tr
							className="rankings"
							key="header"
						>
							<td className="user-name">Name</td>
							<td className="points">Points</td>
							<td className="position">Position</td>
						</tr>
					</thead>
					<tbody className="my-active-leagues">
						{leagueRankings.map(datum => (
							<RankingsRow
								element={datum}
								handleRowClick={() => {}}
								key={datum.position}
							/>
						))}
					</tbody>
				</table>
			</div>
		</Col>
	);
};

RankingsTableBody.defaultProps = {
	leagueRankings: []
};

export default RankingsTableBody;
