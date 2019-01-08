import * as React from 'react';
import '../../Style/Team/Stats.css';
import { getAveragePoints } from '../../Services/UserService';

interface StatsProps {
  setAveragePoints: (totalPoints: number) => void;
  averagePoints: number;
}

interface StatsState {
  totalPoints: number;
}

class Stats extends React.Component<StatsProps, StatsState> {
  componentDidMount() {
    getAveragePoints(0).then(response => {
      console.log('response = ' + JSON.stringify(response));
      this.props.setAveragePoints(response);
    });
  }

  render() {
    return (
      <div className="stats-columns">
        <div className="average-points">Average Points: {this.props.averagePoints}</div>
        <div className="user-most-points">Player with most points = Bob</div>
        <div className="player-most-points">User with most points = Niall</div>
      </div>
    );
  }
}
export default Stats;
