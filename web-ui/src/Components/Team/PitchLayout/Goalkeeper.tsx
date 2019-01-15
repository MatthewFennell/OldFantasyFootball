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
              firstName={this.props.goalkeepers[0].firstName}
              surname={this.props.goalkeepers[0].surname}
              points={this.props.goalkeepers[0].points}
              price={this.props.goalkeepers[0].price}
              transfer={this.props.transfer}
              emptyPlayer={false}
            />
          ) : (
            <Player
              firstName={''}
              surname={''}
              points={0}
              price={0}
              transfer={false}
              emptyPlayer={true}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Goalkeeper;
