import * as React from 'react';
import { PlayerDTO } from '../../Models/Interfaces/Player';

interface TransferRowProps {
  element: PlayerDTO;
  activeTeam: PlayerDTO[];
  addPlayer: (player: PlayerDTO) => void;

  remainingBudget: number;
  setRemainingBudget: (remainingBudget: number) => void;

  addToPlayerBeingAdded: (playerToAdd: PlayerDTO) => void;
  removeFromPlayersBeingRemoved: (index: number) => void;
  playersBeingRemoved: PlayerDTO[];
}

class TransferRow extends React.Component<TransferRowProps> {
	constructor (props: TransferRowProps) {
		super(props);
		this.canAdd = this.canAdd.bind(this);
	}

  handleRowClick = () => {
	  const { addPlayer, playersBeingRemoved, removeFromPlayersBeingRemoved,
			 addToPlayerBeingAdded, setRemainingBudget, remainingBudget, element } = this.props;
  	if (this.canAdd(element)) {
  		addPlayer(element);

  		let removed: boolean = false;
  		playersBeingRemoved.forEach((ele, index) => {
  			if (ele.id === element.id) {
  				removed = true;
  				removeFromPlayersBeingRemoved(index);
  			}
  		});

  		if (!removed) {
  			addToPlayerBeingAdded(element);
  		}
  		if (element.price !== undefined) {
  			setRemainingBudget(remainingBudget - element.price);
  		}
  	}
  };

  canAdd (player: PlayerDTO): boolean {
  	let numberInThatPosition: number = 0;
  	let playerExists: boolean = false;
  	const { activeTeam, remainingBudget } = this.props;
  	activeTeam.forEach(element => {
  		if (element.position === player.position) {
  			numberInThatPosition += 1;
  		}
  		if (element.id === player.id) {
  			playerExists = true;
  		}
  	});

  	if (playerExists) {
  		return false;
  	}
  	if (player.price !== undefined && player.price > remainingBudget) {
  		return false;
  	}

  	if (player.position === 'GOALKEEPER') {
  		if (numberInThatPosition > 0) {
  			return false;
  		}
  	} else if (player.position === 'DEFENDER') {
  		if (numberInThatPosition > 3) {
  			return false;
  		}
  	} else if (player.position === 'MIDFIELDER') {
  		if (numberInThatPosition > 3) {
  			return false;
  		}
  	} else if (player.position === 'ATTACKER') {
  		if (numberInThatPosition > 1) {
  			return false;
  		}
  	}
  	return true;
  }

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
  			onClick={this.handleRowClick}
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
