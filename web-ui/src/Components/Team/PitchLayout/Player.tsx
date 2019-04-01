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
				<div className="player-wrapper">
					<div className="image-empty" />
					<div className="name">No player selected</div>
				</div>
			);
		} else {
			const { firstName, surname, price, weeklyPoints } = this.props.player;
			return (
				<div
					className="player-wrapper"
					onClick={this.handleOnClick}
				>
					{ this.props.player.position === 'GOALKEEPER'
					 ? <div className="image-keeper" />
					  : <div className="image" />}
					<div className="name">
						{firstName} {' '} {surname}
					</div>
					{this.props.transfer ? (
						<div className="value">{'£' + price + 'm'}</div>
					) : (
						<div className="points">{weeklyPoints + ' pts'}</div>
					)}

				</div>

			);
		}
	}
}
export default Player;

// <div
// 	className="filled-player"
// 	onClick={this.handleOnClick}
// >
// 	<div className="image" />
// 	<p className="name">
// 		{firstName} {surname}
// 	</p>
// 	{this.props.transfer ? (
// 		<p className="value">{'£' + price + 'm'}</p>
// 	) : (
// 		<p className="points">{weeklyPoints + ' pts'}</p>
// 	)}
// </div>
