import * as React from 'react';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';

interface RankingsRowProps {
  element: UserLeaguePosition;
}

class RankingsRow extends React.Component<RankingsRowProps> {
  handleRowClick = (firstName: string) => {};

  _activeLeagueJSX = () => {
  	// eslint-disable-next-line react/destructuring-assignment
  	const { firstName, surname, points, position } = this.props.element;
  	return (
  		<tr
  			className="user"
  			key={position}
  			onClick={() => this.handleRowClick(firstName)}
  		>
  			<td className="name">
  				{firstName} {surname}
  			</td>
  			<td className="points">{points}</td>
  			<td className="position">{position}</td>
  		</tr>
  	);
  };

  render () {
  	return <React.Fragment>{this._activeLeagueJSX()}</React.Fragment>;
  }
}
export default RankingsRow;
