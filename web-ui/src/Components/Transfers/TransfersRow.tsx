import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';

interface TransferRowProps {
  element: PlayerDTO;
  handleRowClick: (player: PlayerDTO) => void;
  index: number;
}

const calculateClassName = (rowNumber: number) => {
	return rowNumber % 2 === 0 ? 'transfers-even' : 'transfers-odd';
};

const TransferRow: React.SFC<TransferRowProps> = (props) => {
	const {
		firstName,
		surname,
		position,
		price,
		collegeTeam,
		totalGoals,
		totalAssists,
		points
	} = props.element;
	return (
		<tr
			className={calculateClassName(props.index)}
			key={firstName + surname}
			onClick={() => { props.handleRowClick(props.element); }}
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

export default TransferRow;
