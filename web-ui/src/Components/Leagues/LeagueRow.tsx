import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';

interface LeagueRowProps {
  element: LeaguePositions;
  setLeagueBeingViewed: (leagueBeingViewed: string) => void;
}

class LeagueRow extends React.Component<LeagueRowProps> {
  handleRowClick = (leagueName: string) => {
  	const { setLeagueBeingViewed } = this.props;
  	setLeagueBeingViewed(leagueName);
  };

  _activeLeagueJSX = () => {
  	const { element } = this.props;
  	return (
  		<tr
  			className="league"
  			key={element.leagueName}
  			onClick={() => this.handleRowClick(element.leagueName)}
  		>
  			<td className="league-name">{element.leagueName}</td>
  			<td className="position">{element.position}</td>
  		</tr>
  	);
  };

  render () {
  	return <React.Fragment>{this._activeLeagueJSX()}</React.Fragment>;
  }
}
export default LeagueRow;
