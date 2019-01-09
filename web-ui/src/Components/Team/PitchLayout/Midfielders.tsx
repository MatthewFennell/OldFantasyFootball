import * as React from 'react';
import '../../../Style/Team/PitchLayout/Midfielders.css';
import Player from './Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface MidfielderProps {
  midfielders: WeeklyPlayer[];
}

class Midfielders extends React.Component<MidfielderProps, {}> {
  render() {
    if (this.props.midfielders.length >= 4) {
      return (
        <div className="midfielders-columns">
          <div className="first-midfielder">
            <Player
              firstName={this.props.midfielders[0].firstName}
              surname={this.props.midfielders[0].surname}
              points={this.props.midfielders[0].points}
            />
          </div>
          <div className="second-midfielder">
            <Player
              firstName={this.props.midfielders[1].firstName}
              surname={this.props.midfielders[1].surname}
              points={this.props.midfielders[1].points}
            />
          </div>
          <div className="third-midfielder">
            <Player
              firstName={this.props.midfielders[2].firstName}
              surname={this.props.midfielders[2].surname}
              points={this.props.midfielders[2].points}
            />
          </div>
          <div className="fourth-midfielder">
            <Player
              firstName={this.props.midfielders[3].firstName}
              surname={this.props.midfielders[3].surname}
              points={this.props.midfielders[3].points}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="midfielders-columns">
          <div className="first-midfielder">
            <Player firstName="" surname="" points={0} />
          </div>
          <div className="second-midfielder">
            <Player firstName="" surname="" points={0} />
          </div>
          <div className="third-midfielder">
            <Player firstName="" surname="" points={0} />
          </div>
          <div className="fourth-midfielder">
            <Player firstName="" surname="" points={0} />
          </div>
        </div>
      );
    }
  }
}
export default Midfielders;
