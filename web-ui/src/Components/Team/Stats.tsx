import * as React from 'react';
import '../../Style/Team/Stats.css';

class Stats extends React.Component<{}, {}> {
  render() {
    return (
      <div className="stats-columns">
        <div className="average-points">Average Points: 50</div>
        <div className="user-most-points">Player with most points = Bob</div>
        <div className="player-most-points">User with most points = Nial</div>
      </div>
    );
  }
}
export default Stats;
