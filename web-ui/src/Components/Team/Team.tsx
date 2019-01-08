import * as React from 'react';
import '../../Style/Team/Team.css';
import Info from '../../Containers/Team/Info';
import Stats from '../../Containers/Team/Stats';
import { TopWeeklyPlayer } from '../../Models/Interfaces/TopWeeklyPlayer';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';
import { WeeklyPlayer } from '../../Models/Interfaces/WeeklyPlayer';
import {
  getNumberOfWeeks,
  getPointsForUserInWeek,
  getAveragePoints,
  getPlayersWithMostPointsInWeek,
  getUsersWithMostPointsInWeek,
  getTeamForUserInWeek
} from '../../Services/UserService';
import Pitch from './PitchLayout/Pitch';

interface TransactionsProps {
  totalPoints: number;
  weekBeingViewed: number;
  setWeekBeingViewed: (week: number) => void;

  averageWeeklyPointsCache: any;
  addToAverageWeeklyPointsCache: (id: number, points: number) => void;

  weeklyPointsCache: any;
  addToWeeklyPointsCache: (id: number, points: number) => void;

  topWeeklyPlayerCache: any;
  addToTopWeeklyPlayersCache: (id: number, player: TopWeeklyPlayer) => void;

  topWeeklyUsersCache: any;
  addToTopWeeklyUsersCache: (id: number, player: TopWeeklyUser) => void;

  activeTeam: WeeklyPlayer[];
  setTeam: (team: WeeklyPlayer[]) => void;
}

interface TransactionsState {}

class Transactions extends React.Component<TransactionsProps, TransactionsState> {
  constructor(props: TransactionsProps) {
    super(props);
    // Overestimate the max rows per page (better to load too many than too few)
    this.state = {};
  }

  componentDidMount() {
    getTeamForUserInWeek(0).then(response => {
      console.log('response = ' + JSON.stringify(response));
      this.props.setTeam(response);
    });

    // Get the total number of weeks
    getNumberOfWeeks().then(currentWeek => {
      // Automatically start viewing the latest
      this.props.setWeekBeingViewed(currentWeek);

      getTeamForUserInWeek(currentWeek).then(activeTeam => {
        this.props.setTeam(activeTeam);
      });

      // Hold a cache of [Week -> Average Weekly Points]
      // If not cached, add to it
      if (this.props.averageWeeklyPointsCache[currentWeek] === undefined) {
        getAveragePoints(currentWeek).then(averageWeeklyPoints => {
          this.props.addToAverageWeeklyPointsCache(currentWeek, averageWeeklyPoints);
        });
      }

      // Hold a cache of [Week -> User Points]
      // If the week has not already been cached, then fetch the points for the week
      if (this.props.weeklyPointsCache[currentWeek] === undefined) {
        getPointsForUserInWeek(currentWeek).then(userWeeklyPoints => {
          this.props.addToWeeklyPointsCache(currentWeek, userWeeklyPoints);
        });
      }

      // Top weekly player cache
      if (this.props.topWeeklyPlayerCache[currentWeek] === undefined) {
        getPlayersWithMostPointsInWeek(0).then(playerMostPoints => {
          this.props.addToTopWeeklyPlayersCache(currentWeek, playerMostPoints);
        });
      }

      // Top weekly user cache
      if (this.props.topWeeklyUsersCache[currentWeek] === undefined) {
        getUsersWithMostPointsInWeek(currentWeek).then(userMostPoints => {
          this.props.addToTopWeeklyUsersCache(currentWeek, userMostPoints);
        });
      }
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="outer-rows">
        <div className="row-1-info">
          <Info />
        </div>
        <div className="row-2-stats">
          <Stats />
        </div>
        <div className="row-3-squad">
          <Pitch />
        </div>
        <div className="row-4-bench">Bench</div>
      </div>
    );
  }
}

export default Transactions;
