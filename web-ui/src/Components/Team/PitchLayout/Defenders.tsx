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
							transfer={ this.props.transfer }
							emptyPlayer={ false }
							player={ this.props.defenders[0] }
						/>
					) : (
						<Player transfer={ false } emptyPlayer={ true } />
					)}
				</div>
				<div className="player">
					{this.props.defenders.length >= 2 ? (
						<Player
							transfer={ this.props.transfer }
							emptyPlayer={ false }
							player={ this.props.defenders[1] }
						/>
					) : (
						<Player transfer={ false } emptyPlayer={ true } />
					)}
				</div>
				<div className="player">
					{this.props.defenders.length >= 3 ? (
						<Player
							transfer={ this.props.transfer }
							emptyPlayer={ false }
							player={ this.props.defenders[2] }
						/>
					) : (
						<Player transfer={ false } emptyPlayer={ true } />
					)}
				</div>
				<div className="player">
					{this.props.defenders.length >= 4 ? (
						<Player
							transfer={ this.props.transfer }
							emptyPlayer={ false }
							player={ this.props.defenders[3] }
						/>
					) : (
						<Player transfer={ false } emptyPlayer={ true } />
					)}
				</div>
			</div>
		);
	}
}
export default Defenders;
