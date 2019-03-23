import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';

interface LeagueRowProps {
  element: LeaguePositions;
  setLeagueBeingViewed: (leagueBeingViewed: string) => void;
  index: number;
}

const calculateClassName = (index:number) => {
	return (index % 2 === 0 ? 'league-even' : 'league-odd');
};

const LeagueRow: React.SFC<LeagueRowProps> = (props) => {
	const { element } = props;
	return (
		<tr
			className={calculateClassName(props.index)}
			key={element.leagueName}
			onClick={() => props.setLeagueBeingViewed(element.leagueName)}
		>
			<td className="league-name">{element.leagueName}</td>
			<td className="position">{element.position}</td>
		</tr>
	);
};

export default LeagueRow;
