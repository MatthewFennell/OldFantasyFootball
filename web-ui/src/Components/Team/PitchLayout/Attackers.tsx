import * as React from 'react';
import Player from '../../../Containers/Player';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface AttackerProps {
  attackers: PlayerDTO[];
  transfer: boolean;
}

class Attackers extends React.Component<AttackerProps, {}> {
	render () {
		return (
			<div className="player-columns">
				<div className="player">
					{this.props.attackers.length >= 1 ? (
						<Player
							emptyPlayer={false}
							player={this.props.attackers[0]}
							transfer={this.props.transfer}
						/>
					) : (
						<Player
							emptyPlayer
							transfer={false}
						/>
					)}
				</div>
				<div className="player">
					{this.props.attackers.length >= 2 ? (
						<Player
							emptyPlayer={false}
							player={this.props.attackers[1]}
							transfer={this.props.transfer}
						/>
					) : (
						<Player
							emptyPlayer
							transfer={false}
						/>
					)}
				</div>
			</div>
		);
	}
}
export default Attackers;
