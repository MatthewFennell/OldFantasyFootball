import * as React from 'react';
import '../../../Style/Team/PitchLayout/Attackers.css';
import Player from './Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface AttackerProps {
  attackers: WeeklyPlayer[];
  transfer: boolean;
}

class Attackers extends React.Component<AttackerProps, {}> {
  render() {
    if (this.props.attackers.length >= 2) {
      return (
        <div className="attackers-columns">
          <div className="first-attacker">
            <Player
              firstName={this.props.attackers[0].firstName}
              surname={this.props.attackers[0].surname}
              points={this.props.attackers[0].points}
              price={this.props.attackers[0].price}
              transfer={this.props.transfer}
            />
          </div>
          <div className="second-attacker">
            <Player
              firstName={this.props.attackers[1].firstName}
              surname={this.props.attackers[1].surname}
              points={this.props.attackers[1].points}
              price={this.props.attackers[1].price}
              transfer={this.props.transfer}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="attackers-columns">
          <div className="first-attacker">
            <Player firstName="" surname="" points={0} price={0} transfer={false} />
          </div>
          <div className="second-attacker">
            <Player firstName="" surname="" points={0} price={0} transfer={false} />
          </div>
        </div>
      );
    }
  }
}
export default Attackers;
