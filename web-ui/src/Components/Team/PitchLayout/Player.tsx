import * as React from 'react';
import '../../../Style/Team/PitchLayout/Player.css';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface PlayerProps {
  transfer: boolean;
  handleClickOnPlayer: (player:PlayerDTO) => void;
  emptyPlayer: boolean;
  player: PlayerDTO;

  addOrRemovePlayer: (id: string, price: number, player:PlayerDTO) => void;
  removeFromActiveTeam: (id: string) => void;
}

// eslint-disable-next-line react/require-optimization
class Player extends React.Component<PlayerProps, {}> {
	constructor (props: PlayerProps) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick () {
		if (this.props.transfer) {
			const { price, id } = this.props.player;
			this.props.removeFromActiveTeam(id);
			this.props.addOrRemovePlayer(id, price, this.props.player);
		} else {
			this.props.handleClickOnPlayer(this.props.player);
		}
	}

	render () {
		if (this.props.emptyPlayer) {
			return (
				<div className="empty-player">
					<p className="name">No player selected</p>
				</div>
			);
		} else {
			const { firstName, surname, weeklyPoints, price } = this.props.player;
			return (
				<div
					className="filled-player"
					onClick={this.handleOnClick}
				>
					<p className="name">
						{firstName} {surname}
					</p>
					{this.props.transfer ? (
						<p className="value">{'£' + price + 'm'}</p>
					) : (
						<p className="points">{weeklyPoints + ' pts'}</p>
					)}
				</div>
			);
		}
	}
}
export default Player;
