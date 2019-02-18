import * as React from 'react';
import '../../../Style/Team/PitchLayout/Player.css';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface PlayerProps {
  transfer: boolean;
  emptyPlayer: boolean;
  player: PlayerDTO;

  activeTeam: PlayerDTO[];
  setTeam: (team: PlayerDTO[]) => void;
  removeIndex: (indexToRemove: number) => void;

  setRemainingBudget: (remainingBudget: number) => void;
  remainingBudget: number;

  playersBeingAdded: PlayerDTO[];
  addToPlayerBeingRemoved: (playerBeingAdded: PlayerDTO) => void;
  removeFromPlayersBeingAdded: (index: number) => void;
}

class Player extends React.Component<PlayerProps, {}> {
  constructor(props: PlayerProps) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    console.log('clicked');
    if (this.props.transfer) {
      const { price, id } = this.props.player;
      this._removePlayerFromActiveTeam(id);

      let removed: boolean = false;
      this.props.playersBeingAdded.forEach((element, index) => {
        if (element.id === id) {
          removed = true;
          this.props.removeFromPlayersBeingAdded(index);
        }
      });

      if (!removed) {
        this.props.addToPlayerBeingRemoved(this.props.player);
      }
      this.props.setRemainingBudget(this.props.remainingBudget + price);
    }
  }

  _removePlayerFromActiveTeam(id: string) {
    this.props.activeTeam.forEach((element, index) => {
      if (element.id === id) {
        this.props.removeIndex(index);
      }
    });
  }

  render() {
    if (this.props.emptyPlayer) {
      return (
        <div className="empty-player">
          <p className="name">No player selected</p>
        </div>
      );
    } else {
      const { firstName, surname, weeklyPoints, price } = this.props.player;
      return (
        <div className="player" onClick={this._onClick}>
          <p className="name">
            {firstName} {surname}
          </p>
          {this.props.transfer ? (
            <p className="value">{'£' + price}</p>
          ) : (
            <p className="points">{weeklyPoints + ' pts'}</p>
          )}
        </div>
      );
    }
  }
}
export default Player;
