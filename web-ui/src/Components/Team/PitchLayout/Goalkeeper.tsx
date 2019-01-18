import * as React from 'react';
import '../../../Style/Team/PitchLayout/Goalkeeper.css';
import Player from '../../../Containers/Player';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface GoalkeeperProps {
  goalkeepers: PlayerDTO[];
  transfer: boolean;
}

class Goalkeeper extends React.Component<GoalkeeperProps, {}> {
  render() {
    return (
      <div className="goalkeeper-columns">
        <div className="goalkeeper">
          {this.props.goalkeepers.length >= 1 ? (
            <Player
              transfer={this.props.transfer}
              emptyPlayer={false}
              player={this.props.goalkeepers[0]}
            />
          ) : (
            <Player transfer={false} emptyPlayer={true} />
          )}
        </div>
      </div>
    );
  }
}
export default Goalkeeper;
