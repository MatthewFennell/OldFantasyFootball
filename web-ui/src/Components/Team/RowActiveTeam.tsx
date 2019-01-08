import * as React from 'react';
import { TopWeeklyPlayer } from '../../Models/Interfaces/TopWeeklyPlayer';

interface RowActiveTeamProps {
  element: TopWeeklyPlayer;
}

class RowActiveTeam extends React.Component<RowActiveTeamProps> {
  handleRowClick = () => {};

  _activeTeamJSX = () => {
    const { firstName, surname, position, price, id } = this.props.element;
    return (
      <tr className="player-in-active-team" key={id} onClick={() => this.handleRowClick()}>
        <td className="first name">{firstName}</td>
        <td className="surname">{surname}</td>
        <td className="position">{position}</td>
        <td className="price">{price}</td>
      </tr>
    );
  };

  render() {
    return <React.Fragment>{this._activeTeamJSX()}</React.Fragment>;
  }
}
export default RowActiveTeam;
