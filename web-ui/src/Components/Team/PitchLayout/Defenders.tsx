import * as React from 'react';
import '../../../Style/Team/PitchLayout/Defenders.css';
import Player from './Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface DefenderProps {
  defenders: WeeklyPlayer[];
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
            />
          </div>
          <div className="second-defender">
            <Player
              firstName={this.props.defenders[1].firstName}
              surname={this.props.defenders[1].surname}
              points={this.props.defenders[1].points}
            />
          </div>
          <div className="third-defender">
            <Player
              firstName={this.props.defenders[2].firstName}
              surname={this.props.defenders[2].surname}
              points={this.props.defenders[2].points}
            />
          </div>
          <div className="fourth-defender">
            <Player
              firstName={this.props.defenders[3].firstName}
              surname={this.props.defenders[3].surname}
              points={this.props.defenders[3].points}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="defenders-columns">
          <div className="first-defender">
            <Player firstName="" surname="" points={0} />
          </div>
          <div className="second-defender">
            <Player firstName="" surname="" points={0} />
          </div>
          <div className="third-defender">
            <Player firstName="" surname="" points={0} />
          </div>
          <div className="fourth-defender">
            <Player firstName="" surname="" points={0} />
          </div>
        </div>
      );
    }
  }
}
export default Defenders;
