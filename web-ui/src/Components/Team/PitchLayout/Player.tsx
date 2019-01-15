import * as React from 'react';
import '../../../Style/Team/PitchLayout/Player.css';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface PlayerProps {
  firstName: string;
  surname: string;
  points: number;
  price: number;
  transfer: boolean;
  emptyPlayer: boolean;

  activeTeam: WeeklyPlayer[];
  setTeam: (team: WeeklyPlayer[]) => void;
  removeIndex: (indexToRemove: number) => void;

  setRemainingBudget: (remainingBudget: number) => void;
  remainingBudget: number;

  playersBeingAdded: WeeklyPlayer[];
  addToPlayerBeingRemoved: (playerBeingAdded: WeeklyPlayer) => void;
  removeFromPlayersBeingAdded: (index: number) => void;
}

class Player extends React.Component<PlayerProps, {}> {
  constructor(props: PlayerProps) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    if (this.props.transfer) {
      console.log('clicked on player ' + this.props.firstName);
      const { firstName, surname, price } = this.props;
      this._removePlayerFromActiveTeam(firstName, surname, price);
      let player: WeeklyPlayer = {
        id: 'dunno',
        firstName,
        surname,
        position: 'unknown',
        points: -5,
        price: price
      };

      let removed: boolean = false;
      this.props.playersBeingAdded.forEach((element, index) => {
        if (
          element.firstName === firstName &&
          element.surname === surname &&
          element.price === price
        ) {
          console.log('hey)');
          removed = true;
          this.props.removeFromPlayersBeingAdded(index);
        } else {
          console.log('nop');
        }
      });

      if (!removed) {
        this.props.addToPlayerBeingRemoved(player);
      }
      this.props.setRemainingBudget(this.props.remainingBudget + price);
    }
  }

  _removePlayerFromActiveTeam(firstName: string, surname: string, price: number) {
    console.log('Trying to remove player ' + firstName + ', ' + surname + ', ' + price);
    this.props.activeTeam.forEach((element, index) => {
      if (
        element.firstName === firstName &&
        element.surname === surname &&
        element.price === price
      ) {
        console.log('hey)');
        this.props.removeIndex(index);
      } else {
        console.log('nop');
      }
    });
  }

  render() {
    const { firstName, surname, points, price } = this.props;

    if (this.props.emptyPlayer) {
      return (
        <div>
          <div className="empty-player">
            <p className="name">No player selected</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="player" onClick={this._onClick}>
          <p className="name">
            {firstName} {surname}
          </p>
          {this.props.transfer ? (
            <p className="value">{'£' + price}</p>
          ) : (
            <p className="points">{points + ' pts'}</p>
          )}
        </div>
      );
    }
  }
}
export default Player;
