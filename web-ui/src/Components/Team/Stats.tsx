import * as React from 'react';
import '../../Style/Team/Stats.css';
// import { getTotalPoints } from '../../Services/UserService';

interface StatsProps {
  setTotalPoints: (totalPoints: any) => void;
  totalPoints: number;
}

interface StatsState {
  totalPoints: number;
}

class Stats extends React.Component<StatsProps, StatsState> {
  componentDidMount() {
    // getTotalPoints().then(response => {
    //   console.log('Response = ' + response);
    //   this.props.setTotalPoints(response);
    // });
    // this.props.setTotalPoints(10);
  }

  render() {
    console.log('Props = ' + this.props.totalPoints);
    return (
      <div className="stats-columns">
        <div className="average-points">Average Points: {this.props.totalPoints}</div>
        <div className="user-most-points">Player with most points = Bob</div>
        <div className="player-most-points">User with most points = Niall</div>
      </div>
    );
  }
}
export default Stats;
