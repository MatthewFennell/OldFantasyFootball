import * as React from 'react';
import { FilteredPlayer } from '../../Models/Interfaces/FilteredPlayer';
import { WeeklyPlayer } from '../../Models/Interfaces/WeeklyPlayer';

interface TransferRowProps {
  element: FilteredPlayer;
  activeTeam: WeeklyPlayer[];
  addPlayer: (player: WeeklyPlayer) => void;

  remainingBudget: number;
  setRemainingBudget: (remainingBudget: number) => void;
}

class TransferRow extends React.Component<TransferRowProps> {
  constructor(props: TransferRowProps) {
    super(props);
    this.canAdd = this.canAdd.bind(this);
  }

  handleRowClick = (
    firstName: string,
    surname: string,
    position: string,
    points: number,
    price: number
  ) => {
    console.log('clicked row of league ' + firstName);
    let player: WeeklyPlayer = {
      id: 'dunno',
      firstName,
      surname,
      position,
      points,
      price
    };
    if (this.canAdd(player)) {
      this.props.addPlayer(player);
      this.props.setRemainingBudget(this.props.remainingBudget - player.price);
    }
  };

  canAdd(player: WeeklyPlayer): boolean {
    let numberInThatPosition: number = 0;
    let playerExists: boolean = false;
    this.props.activeTeam.forEach(element => {
      if (element.position === player.position) {
        numberInThatPosition += 1;
      }
      if (
        element.firstName === player.firstName &&
        element.surname === player.surname &&
        element.price === player.price
      ) {
        console.log('Cannot add the same player twice');
        playerExists = true;
      }
    });

    console.log('Position = ' + player.position);
    console.log('There are ' + numberInThatPosition + ' players already in that position');
    if (playerExists) {
      return false;
    }
    if (player.price > this.props.remainingBudget) {
      console.log('You do not have enough $$$');
      return false;
    }

    if (player.position === 'GOALKEEPER') {
      if (numberInThatPosition > 0) {
        console.log('Can only have 1 keeper!');
        return false;
      }
    } else if (player.position === 'DEFENDER') {
      if (numberInThatPosition > 3) {
        console.log('Can only have 4 defenders!');
        return false;
      }
    } else if (player.position === 'MIDFIELDER') {
      if (numberInThatPosition > 3) {
        console.log('Can only have 4 midfielders!');
        return false;
      }
    } else if (player.position === 'ATTACKER') {
      if (numberInThatPosition > 1) {
        console.log('Can only have 2 attackers!');
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
        onClick={() => this.handleRowClick(firstName, surname, position, totalScore, price)}
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
