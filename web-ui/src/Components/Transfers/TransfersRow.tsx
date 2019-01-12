import * as React from 'react';
import { FilteredPlayer } from '../../Models/Interfaces/FilteredPlayer';

interface TransferRowProps {
  element: FilteredPlayer;
}

class TransferRow extends React.Component<TransferRowProps> {
  handleRowClick = (playerName: string) => {
    console.log('clicked row of league ' + playerName);
  };

  _activeFilteredPlayersJSX = () => {
    const {
      firstName,
      surname,
      position,
      team,
      price,
      totalGoals,
      totalAssists,
      totalScore
    } = this.props.element;
    return (
      <tr
        className="transfers"
        key={firstName + surname}
        onClick={() => this.handleRowClick(firstName)}
      >
        <td className="name">{firstName + ' ' + surname}</td>
        <td className="position">{position[0] + position.substring(1).toLowerCase()}</td>
        <td className="team">{team}</td>
        <td className="price">{price}</td>
        <td className="goals">{totalGoals}</td>
        <td className="assists">{totalAssists}</td>
        <td className="score">{totalScore}</td>
      </tr>
    );
  };

  render() {
    return <React.Fragment>{this._activeFilteredPlayersJSX()}</React.Fragment>;
  }
}
export default TransferRow;
