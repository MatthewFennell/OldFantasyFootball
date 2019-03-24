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
	return (
		<Col
			className="league-info-screen"
			lg={6}
			md={6}
			xs={6}
		>
			<div className="rankings-wrapper">
				<div className="current-league-name">
					<div className="info">
						<div className="league-name">
					League: { props.leagueBeingViewed}
						</div>
						{props.isAdmin ? (
							<div className="league-info">Code to join : {props.code} </div>
						) : (
							<div className="league-info">Admin : {props.code} </div>
						)}
					</div>
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
						{props.leagueRankings.map((datum, index) => (
							<RankingsRow
								element={datum}
								handleRowClick={() => {}}
								index={index}
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
