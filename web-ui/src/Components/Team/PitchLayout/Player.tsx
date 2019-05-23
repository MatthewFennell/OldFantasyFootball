import * as React from 'react';
import '../../../Style/Team/PitchLayout/Player.css';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import classnames from 'classnames';

interface PlayerProps {
  transfer: boolean;
  handleClickOnPlayer: (player:PlayerDTO) => void;
  emptyPlayer: boolean;
  player: PlayerDTO;
  noPoints: boolean;
  newPlayer: boolean;
  removePlayer: (id: string, price: number, player:PlayerDTO) => void;
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
			this.props.removePlayer(id, price, this.props.player);
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
			const { firstName, surname, price, weeklyPoints, collegeTeam } = this.props.player;
			return (
				<div
					className="player-wrapper"
					onClick={this.handleOnClick}
				>
					{ this.props.player.position === 'GOALKEEPER'
					 ? <div className={classnames({
							imageKeeper: !this.props.newPlayer || !this.props.transfer,
							imageKeeperNew: this.props.newPlayer && this.props.transfer
						})}
					   />
					  : <div className={classnames({
							image: !this.props.newPlayer || !this.props.transfer,
							newPlayer: this.props.newPlayer && this.props.transfer
						})}
					    />}
					<div className="name">
						{firstName} {' '} {surname}
					</div>

					{!this.props.noPoints ? this.props.transfer
						? <div className="value">{'£' + price + 'm'}</div>
						: <div className="points">{weeklyPoints + ' pts'}</div>
						: <div className="points">{'Team: ' + collegeTeam}</div>}
				</div>

			);
		}
	}
}
export default Player;
