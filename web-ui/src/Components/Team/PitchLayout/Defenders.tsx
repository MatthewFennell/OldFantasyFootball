import * as React from 'react';
import Player from '../../../Containers/Player';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface DefenderProps {
  defenders: PlayerDTO[];
  transfer: boolean;
}

class Defenders extends React.Component<DefenderProps, {}> {
	render () {
		return (
			<div className="player-columns">
				<div className="player">
					{this.props.defenders.length >= 1 ? (
						<Player
							emptyPlayer={false}
							player={this.props.defenders[0]}
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
					{this.props.defenders.length >= 2 ? (
						<Player
							emptyPlayer={false}
							player={this.props.defenders[1]}
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
					{this.props.defenders.length >= 3 ? (
						<Player
							emptyPlayer={false}
							player={this.props.defenders[2]}
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
					{this.props.defenders.length >= 4 ? (
						<Player
							emptyPlayer={false}
							player={this.props.defenders[3]}
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
export default Defenders;
