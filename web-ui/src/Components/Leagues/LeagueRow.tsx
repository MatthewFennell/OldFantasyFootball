import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';

interface LeagueRowProps {
  element: LeaguePositions;
  setLeagueBeingViewed: (leagueBeingViewed: string) => void;
}

const LeagueRow: React.SFC<LeagueRowProps> = (props) => {
	const { element } = props;
	return (
		<tr
			className="league"
			key={element.leagueName}
			onClick={() => props.setLeagueBeingViewed(element.leagueName)}
		>
			<td className="league-name">{element.leagueName}</td>
			<td className="position">{element.position}</td>
		</tr>
	);
};

export default LeagueRow;
