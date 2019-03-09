import * as React from 'react';
import Player from '../../../Containers/Player';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface MidfielderProps {
  midfielders: PlayerDTO[];
  transfer: boolean;
}

class Midfielders extends React.Component<MidfielderProps, {}> {
	render () {
		return (
			<div className="player-columns">
				<div className="player">
					{this.props.midfielders.length >= 1 ? (
						<Player
							emptyPlayer={false}
							player={this.props.midfielders[0]}
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
					{this.props.midfielders.length >= 2 ? (
						<Player
							emptyPlayer={false}
							player={this.props.midfielders[1]}
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
					{this.props.midfielders.length >= 3 ? (
						<Player
							emptyPlayer={false}
							player={this.props.midfielders[2]}
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
					{this.props.midfielders.length >= 4 ? (
						<Player
							emptyPlayer={false}
							player={this.props.midfielders[3]}
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
export default Midfielders;
