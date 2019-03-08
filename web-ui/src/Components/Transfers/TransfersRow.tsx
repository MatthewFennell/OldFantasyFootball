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

  handleRowClick = (player: PlayerDTO) => {
  	if (this.canAdd(player)) {
  		this.props.addPlayer(player);

  		let removed: boolean = false;
  		this.props.playersBeingRemoved.forEach((element, index) => {
  			if (element.id === player.id) {
  				removed = true;
  				this.props.removeFromPlayersBeingRemoved(index);
  			}
  		});

  		if (!removed) {
  			this.props.addToPlayerBeingAdded(player);
  		}
  		if (player.price !== undefined) {
  			this.props.setRemainingBudget(this.props.remainingBudget - player.price);
  		}
  	}
  };

  canAdd (player: PlayerDTO): boolean {
  	let numberInThatPosition: number = 0;
  	let playerExists: boolean = false;
  	this.props.activeTeam.forEach(element => {
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
  	if (player.price !== undefined && player.price > this.props.remainingBudget) {
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
  	} = this.props.element;
  	return (
  		<tr
  			className="transfers"
  			key={ firstName + surname }
  			onClick={ () => this.handleRowClick(this.props.element) }
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
