import * as React from 'react';
import Player from '../../../Containers/Player';
import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface MidfielderProps {
  midfielders: PlayerDTO[];
  transfer: boolean;
}

class Midfielders extends React.Component<MidfielderProps, {}> {
  render() {
    return (
      <div className="player-columns">
        <div className="player">
          {this.props.midfielders.length >= 1 ? (
            <Player
              transfer={this.props.transfer}
              emptyPlayer={false}
              player={this.props.midfielders[0]}
            />
          ) : (
            <Player transfer={false} emptyPlayer={true} />
          )}
        </div>
        <div className="player">
          {this.props.midfielders.length >= 2 ? (
            <Player
              transfer={this.props.transfer}
              emptyPlayer={false}
              player={this.props.midfielders[1]}
            />
          ) : (
            <Player transfer={false} emptyPlayer={true} />
          )}
        </div>
        <div className="player">
          {this.props.midfielders.length >= 3 ? (
            <Player
              transfer={this.props.transfer}
              emptyPlayer={false}
              player={this.props.midfielders[2]}
            />
          ) : (
            <Player transfer={false} emptyPlayer={true} />
          )}
        </div>
        <div className="player">
          {this.props.midfielders.length >= 4 ? (
            <Player
              transfer={this.props.transfer}
              emptyPlayer={false}
              player={this.props.midfielders[3]}
            />
          ) : (
            <Player transfer={false} emptyPlayer={true} />
          )}
        </div>
      </div>
    );
  }
}
export default Midfielders;
