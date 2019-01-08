import * as React from 'react';
import '../../Style/Team/Info.css';
import { getNumberOfWeeks, getPointsForUserInWeek } from '../../Services/UserService';

interface StatsProps {
  totalPoints: number;
  weekBeingViewed: number;
  pointsInActiveWeek: number;
  setWeekBeingViewed: (week: number) => void;
  setPointsInActiveWeek: (weekPoints: number) => void;

  weeklyPointsCache: any;
  addToWeeklyPointsCache: (id: number, points: number) => void;
}

class Info extends React.Component<StatsProps, {}> {
  componentDidMount() {
    // Get the total number of weeks
    getNumberOfWeeks().then(response => {
      // Automatically start viewing the latest
      this.props.setWeekBeingViewed(response);

      // Hold a cache of [Week -> Points]
      // If the week has not already been cached, then fetch the points for the week
      if (this.props.weeklyPointsCache[response] === undefined) {
        getPointsForUserInWeek(response).then(response1 => {
          this.props.setPointsInActiveWeek(response1);
          this.props.addToWeeklyPointsCache(response, response1);
        });
      }
    });
  }

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
