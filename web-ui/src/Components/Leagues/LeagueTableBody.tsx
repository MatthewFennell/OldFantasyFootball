import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueRow from './LeagueRow';

interface LeagueTableBodyProps {
	leagues: LeaguePositions[];
	setLeagueBeingViewed: (leagueBeingViewed: string) => void;
}

const LeagueTableBody: React.SFC<LeagueTableBodyProps> = (props) => {
	const { leagues, setLeagueBeingViewed } = props;
	return (
		<table className="my-active-leagues-table">
			<tbody className="my-active-leagues">
				<tr
					className="league-header"
					key="header"
				>
					<td className="league-name">League</td>
					<td className="position">Position</td>
				</tr>
				{leagues.map(datum => (
					<LeagueRow
						element={datum}
						key={datum.leagueName}
						setLeagueBeingViewed={setLeagueBeingViewed}
					/>
				))}
			</tbody>
		</table>
	);
};

LeagueTableBody.defaultProps = {
	leagues: [],
	setLeagueBeingViewed: () => {}
};

export default LeagueTableBody;
