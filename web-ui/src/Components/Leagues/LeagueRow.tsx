import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';

interface LeagueRowProps {
  element: LeaguePositions;
}

class LeagueRow extends React.Component<LeagueRowProps> {
  handleRowClick = () => {};

  _activeLeagueJSX = () => {
    const { leagueName, position } = this.props.element;
    return (
      <tr className="league" key={leagueName} onClick={() => this.handleRowClick()}>
        <td className="league-name">{leagueName}</td>
        <td className="position">{position}</td>
      </tr>
    );
  };

  render() {
    return <React.Fragment>{this._activeLeagueJSX()}</React.Fragment>;
  }
}
export default LeagueRow;
