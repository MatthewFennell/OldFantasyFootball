import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';

interface LeagueRowProps {
  element: LeaguePositions;
  setLeagueBeingViewed: (leagueBeingViewed: string) => void;
}

class LeagueRow extends React.Component<LeagueRowProps> {
  handleRowClick = (leagueName: string) => {
  	this.props.setLeagueBeingViewed(leagueName);
  };

  _activeLeagueJSX = () => {
  	const { leagueName, position } = this.props.element;
  	return (
  		<tr className="league" key={leagueName} onClick={() => this.handleRowClick(leagueName)}>
  			<td className="league-name">{leagueName}</td>
  			<td className="position">{position}</td>
  		</tr>
  	);
  };

  render () {
  	return <React.Fragment>{this._activeLeagueJSX()}</React.Fragment>;
  }
}
export default LeagueRow;
