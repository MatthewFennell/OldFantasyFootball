import * as React from 'react';
import '../../../Style/Team/PitchLayout/Midfielders.css';
import Player from '../../../Containers/Player';
import { WeeklyPlayer } from '../../../Models/Interfaces/WeeklyPlayer';

interface MidfielderProps {
  midfielders: WeeklyPlayer[];
  transfer: boolean;
}

class Midfielders extends React.Component<MidfielderProps, {}> {
  render() {
    return (
      <div className="midfielders-columns">
        <div className="first-midfielder">
          {this.props.midfielders.length >= 1 ? (
            <Player
              firstName={this.props.midfielders[0].firstName}
              surname={this.props.midfielders[0].surname}
              points={this.props.midfielders[0].points}
              price={this.props.midfielders[0].price}
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
        <div className="second-midfielder">
          {this.props.midfielders.length >= 2 ? (
            <Player
              firstName={this.props.midfielders[1].firstName}
              surname={this.props.midfielders[1].surname}
              points={this.props.midfielders[1].points}
              price={this.props.midfielders[1].price}
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
        <div className="third-midfielder">
          {this.props.midfielders.length >= 3 ? (
            <Player
              firstName={this.props.midfielders[2].firstName}
              surname={this.props.midfielders[2].surname}
              points={this.props.midfielders[2].points}
              price={this.props.midfielders[2].price}
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
        <div className="fourth-midfielder">
          {this.props.midfielders.length >= 4 ? (
            <Player
              firstName={this.props.midfielders[3].firstName}
              surname={this.props.midfielders[3].surname}
              points={this.props.midfielders[3].points}
              price={this.props.midfielders[3].price}
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
export default Midfielders;
