import * as React from 'react';
import '../../../Style/Team/PitchLayout/Defenders.css';
import Player from '../../../Containers/Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface DefenderProps {
  defenders: WeeklyPlayer[];
  transfer: boolean;
}

class Defenders extends React.Component<DefenderProps, {}> {
  render() {
    return (
      <div className="defenders-columns">
        <div className="first-defender">
          {this.props.defenders.length >= 1 ? (
            <Player
              firstName={this.props.defenders[0].firstName}
              surname={this.props.defenders[0].surname}
              points={this.props.defenders[0].points}
              price={this.props.defenders[0].price}
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
        <div className="second-defender">
          {this.props.defenders.length >= 2 ? (
            <Player
              firstName={this.props.defenders[1].firstName}
              surname={this.props.defenders[1].surname}
              points={this.props.defenders[1].points}
              price={this.props.defenders[1].price}
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
        <div className="third-defender">
          {this.props.defenders.length >= 3 ? (
            <Player
              firstName={this.props.defenders[2].firstName}
              surname={this.props.defenders[2].surname}
              points={this.props.defenders[2].points}
              price={this.props.defenders[2].price}
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
        <div className="fourth-defender">
          {this.props.defenders.length >= 4 ? (
            <Player
              firstName={this.props.defenders[3].firstName}
              surname={this.props.defenders[3].surname}
              points={this.props.defenders[3].points}
              price={this.props.defenders[3].price}
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
export default Defenders;
