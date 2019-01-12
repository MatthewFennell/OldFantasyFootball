import * as React from 'react';
import '../../../Style/Team/PitchLayout/Attackers.css';
import Player from '../../../Containers/Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface AttackerProps {
  attackers: WeeklyPlayer[];
  transfer: boolean;
}

class Attackers extends React.Component<AttackerProps, {}> {
  render() {
    return (
      <div className="attackers-columns">
        <div className="first-attacker">
          {this.props.attackers.length >= 1 ? (
            <Player
              firstName={this.props.attackers[0].firstName}
              surname={this.props.attackers[0].surname}
              points={this.props.attackers[0].points}
              price={this.props.attackers[0].price}
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
        <div className="second-attacker">
          {this.props.attackers.length >= 2 ? (
            <Player
              firstName={this.props.attackers[1].firstName}
              surname={this.props.attackers[1].surname}
              points={this.props.attackers[1].points}
              price={this.props.attackers[1].price}
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
export default Attackers;
