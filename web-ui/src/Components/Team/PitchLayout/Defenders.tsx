import * as React from 'react';
import '../../../Style/Team/PitchLayout/Defenders.css';
import Player from './Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface DefenderProps {
  defenders: WeeklyPlayer[];
  transfer: boolean;
}

class Defenders extends React.Component<DefenderProps, {}> {
  render() {
    if (this.props.defenders.length >= 4) {
      return (
        <div className="defenders-columns">
          <div className="first-defender">
            <Player
              firstName={this.props.defenders[0].firstName}
              surname={this.props.defenders[0].surname}
              points={this.props.defenders[0].points}
              price={this.props.defenders[0].price}
              transfer={this.props.transfer}
            />
          </div>
          <div className="second-defender">
            <Player
              firstName={this.props.defenders[1].firstName}
              surname={this.props.defenders[1].surname}
              points={this.props.defenders[1].points}
              price={this.props.defenders[1].price}
              transfer={this.props.transfer}
            />
          </div>
          <div className="third-defender">
            <Player
              firstName={this.props.defenders[2].firstName}
              surname={this.props.defenders[2].surname}
              points={this.props.defenders[2].points}
              price={this.props.defenders[2].price}
              transfer={this.props.transfer}
            />
          </div>
          <div className="fourth-defender">
            <Player
              firstName={this.props.defenders[3].firstName}
              surname={this.props.defenders[3].surname}
              points={this.props.defenders[3].points}
              price={this.props.defenders[3].price}
              transfer={this.props.transfer}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="defenders-columns">
          <div className="first-defender">
            <Player firstName="" surname="" points={0} price={0} transfer={false} />
          </div>
          <div className="second-defender">
            <Player firstName="" surname="" points={0} price={0} transfer={false} />
          </div>
          <div className="third-defender">
            <Player firstName="" surname="" points={0} price={0} transfer={false} />
          </div>
          <div className="fourth-defender">
            <Player firstName="" surname="" points={0} price={0} transfer={false} />
          </div>
        </div>
      );
    }
  }
}
export default Defenders;
