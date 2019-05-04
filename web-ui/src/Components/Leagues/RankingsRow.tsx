import * as React from 'react';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';

interface RankingsRowProps {
	element: UserLeaguePosition;
	handleViewUser: (name: string) => void;
	index: number;
}

const calculateClassName = (index: number) => {
	return index % 2 === 0 ? 'user-even' : 'user-odd';
};

const RankingsRow: React.FC<RankingsRowProps> = (props) => {
	const { firstName, surname, points, position, userID } = props.element;
	const handleViewUser = React.useCallback(
		() => props.handleViewUser(userID),
		[ props.handleViewUser, userID ]
	);
  	return (
  		<tr
  			className={calculateClassName(props.index)}
  			key={position}
  			onClick={handleViewUser}
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
