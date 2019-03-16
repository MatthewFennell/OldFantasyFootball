import * as React from 'react';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';

interface RankingsRowProps {
	element: UserLeaguePosition;
	handleRowClick: (name: string) => void;
}

const RankingsRow: React.SFC<RankingsRowProps> = (props) => {
	const { firstName, surname, points, position } = props.element;
  	return (
  		<tr
  			className="user"
  			key={position}
  			onClick={() => props.handleRowClick(firstName)}
  		>
  			<td className="name">
  				{firstName} {surname}
  			</td>
  			<td className="points">{points}</td>
  			<td className="position">{position}</td>
  		</tr>
  	);
};

export default RankingsRow;
