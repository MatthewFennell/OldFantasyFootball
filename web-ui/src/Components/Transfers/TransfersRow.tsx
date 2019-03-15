import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';

interface TransferRowProps {
  element: PlayerDTO;
  handleRowClick: (player: PlayerDTO) => void;
}

class TransferRow extends React.Component<TransferRowProps> {
  _activeFilteredPlayersJSX = () => {
  	const {
  		firstName,
  		surname,
  		position,
  		price,
  		collegeTeam,
  		totalGoals,
  		totalAssists,
  		points
  	// eslint-disable-next-line react/destructuring-assignment
  	} = this.props.element;
  	return (
  		<tr
  			className="transfers"
  			key={firstName + surname}
  			onClick={() => { this.props.handleRowClick(this.props.element); }}
  		>
  			<td className="name">{firstName + ' ' + surname}</td>
  			<td className="position">{position[0] + position.substring(1).toLowerCase()}</td>
  			<td className="team">{collegeTeam}</td>
  			<td className="price">{price.toFixed(1)}</td>
  			<td className="goals">{totalGoals}</td>
  			<td className="assists">{totalAssists}</td>
  			<td className="score">{points}</td>
  		</tr>
  	);
  };

  render () {
  	return <React.Fragment>{this._activeFilteredPlayersJSX()}</React.Fragment>;
  }
}
export default TransferRow;
