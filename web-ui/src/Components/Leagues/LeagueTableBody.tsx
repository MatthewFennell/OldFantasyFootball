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
		<tbody className="my-active-leagues">
			<tr
				className="league-header"
				key="header"
			>
				<td className="league-name">League Name</td>
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
	);
};

LeagueTableBody.defaultProps = {
	leagues: [],
	setLeagueBeingViewed: () => {}
};

export default LeagueTableBody;
