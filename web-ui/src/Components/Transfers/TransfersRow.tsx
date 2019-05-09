import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import Media from 'react-media';

interface TransferRowProps {
  element: PlayerDTO;
  handleRowClick: (player: PlayerDTO) => void;
  index: number;
  searchingByPercentage: boolean;
}

const calculateClassName = (rowNumber: number) => {
	return rowNumber % 2 === 0 ? 'transfers-even' : 'transfers-odd';
};

const TransferRow: React.FC<TransferRowProps> = (props) => {
	let {
		firstName,
		surname,
		position,
		price,
		collegeTeam,
		totalGoals,
		totalAssists,
		points,
		percentages
	} = props.element;
	const handleRowClick = React.useCallback(
		() => props.handleRowClick(props.element),
		[ props.handleRowClick, props.element ]
	);
	if (position !== undefined) {
		if (position === 'ATTACKER') {
			position = 'ATK';
		} else if (position === 'MIDFIELDER') {
			position = 'MID';
		} else if (position === 'DEFENDER') {
			position = 'DEF';
		} else if (position === 'GOALKEEPER') {
			position = 'GK';
		}
	}
	return (
		<tr
			className={calculateClassName(props.index)}
			key={firstName + surname}
			onClick={handleRowClick}
		>
			<td className="name">{firstName + ' ' + surname}</td>
			<td className="position">{position}</td>
			<td className="team">{collegeTeam}</td>
			<td className="price">{price.toFixed(1)}</td>
			<td className="goals">{totalGoals}</td>

			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						null
					) : (
						<td className="assists">{totalAssists}</td>
					)
				}
			</Media>

			{props.searchingByPercentage ? <td className="percentage">{percentages.toFixed(1)}</td>
				: <td className="score">{points}</td>}
		</tr>
	);
};

export default TransferRow;
