import * as React from 'react';
import '../../Style/Team/Info.css';
// import {
//   getNumberOfWeeks,
//   getPointsForUserInWeek,
//   getAveragePoints
// } from '../../Services/UserService';

interface StatsProps {
  totalPoints: number;
  weekBeingViewed: number;
  weeklyPointsCache: any;
}

class Info extends React.Component<StatsProps, {}> {
  componentDidMount() {}

  render() {
    const { totalPoints, weekBeingViewed, weeklyPointsCache } = this.props;
    return (
      <div className="info-columns">
        <div className="total-points">Total Points: {totalPoints}</div>
        <div className="current-week-dropdown">Week {weekBeingViewed}</div>
        <div className="week-points">Week points : {weeklyPointsCache[weekBeingViewed]}</div>
      </div>
    );
  }
}
export default Info;
