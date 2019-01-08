import * as React from 'react';
import '../../Style/Team/Stats.css';

interface StatsProps {
  averageWeeklyPointsCache: any;
  topWeeklyPlayerCache: any;
  weekBeingViewed: number;
  topWeeklyUsersCache: any;
}

interface StatsState {}

class Stats extends React.Component<StatsProps, StatsState> {
  componentDidMount() {}

  // Only load the player name when it's been added to the cache
  render() {
    const {
      averageWeeklyPointsCache,
      weekBeingViewed,
      topWeeklyPlayerCache,
      topWeeklyUsersCache
    } = this.props;

    return (
      <div className="stats-columns">
        <div className="average-points">
          Average Points: {averageWeeklyPointsCache[weekBeingViewed]}
        </div>

        {topWeeklyPlayerCache[weekBeingViewed] !== undefined ? (
          <div className="player-most-points">
            Player of the Week : {topWeeklyPlayerCache[weekBeingViewed].firstName}{' '}
            {topWeeklyPlayerCache[weekBeingViewed].surname} (
            {topWeeklyPlayerCache[weekBeingViewed].points} points)
          </div>
        ) : (
          <div className="player-most-points">Player with most points :</div>
        )}

        {topWeeklyUsersCache[weekBeingViewed] !== undefined ? (
          <div className="user-most-points">
            Team of the Week : {topWeeklyUsersCache[weekBeingViewed].firstName}{' '}
            {topWeeklyUsersCache[weekBeingViewed].surname} (
            {topWeeklyUsersCache[weekBeingViewed].points} points )
          </div>
        ) : (
          <div className="user-most-points">Player with most points :</div>
        )}
      </div>
    );
  }
}
export default Stats;
