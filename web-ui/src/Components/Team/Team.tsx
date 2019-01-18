import * as React from 'react';
import '../../Style/Team/Team.css';
import '../../Style/Team/PitchLayout/Pitch.css';
import Info from '../../Containers/Team/Info';
import Stats from '../../Containers/Team/Stats';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { getNumberOfWeeks } from '../../Services/Weeks/WeeksService';
import Pitch from './PitchLayout/Pitch';
import {
  getTeamForUserInWeek,
  getPlayersWithMostPointsInWeek
} from '../../Services/Player/PlayerService';
import {
  getAveragePoints,
  getPointsForUserInWeek,
  getUsersWithMostPointsInWeek
} from '../../Services/Points/PointsService';

interface TransactionsProps {
  totalPoints: number;
  weekBeingViewed: number;
  setWeekBeingViewed: (week: number) => void;

  averageWeeklyPointsCache: any;
  addToAverageWeeklyPointsCache: (id: number, points: number) => void;

  weeklyPointsCache: any;
  addToWeeklyPointsCache: (id: number, points: number) => void;

  topWeeklyPlayerCache: any;
  addToTopWeeklyPlayersCache: (id: number, player: PlayerDTO) => void;

  topWeeklyUsersCache: any;
  addToTopWeeklyUsersCache: (id: number, player: TopWeeklyUser) => void;

  activeTeam: PlayerDTO[];
  setTeam: (team: PlayerDTO[]) => void;

  weeklyTeamCache: any;
  addToWeeklyTeamCache: (id: number, team: PlayerDTO[]) => void;

  setTotalNumberOfWeeks: (numberOfWeeks: number) => void;
}

interface TransactionsState {}

class Transactions extends React.Component<TransactionsProps, TransactionsState> {
  componentDidMount() {
    // Get the total number of weeks
    getNumberOfWeeks().then(currentWeek => {
      // Automatically start viewing the latest
      this.props.setWeekBeingViewed(currentWeek);
      this.props.setTotalNumberOfWeeks(currentWeek);
      this._generateCache(currentWeek);
    });
  }

  _generateCache(currentWeek: number) {
    getTeamForUserInWeek(currentWeek).then(activeTeam => {
      this.props.setTeam(activeTeam);
    });

    // Hold a cache of [Week -> Weekly Team]
    if (this.props.weeklyTeamCache[currentWeek] === undefined) {
      getTeamForUserInWeek(currentWeek).then(weeklyTeam => {
        this.props.addToWeeklyTeamCache(currentWeek, weeklyTeam);
      });
    }

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
      getPlayersWithMostPointsInWeek(currentWeek).then(playerMostPoints => {
        this.props.addToTopWeeklyPlayersCache(currentWeek, playerMostPoints);
      });
    }

    // Top weekly user cache
    if (this.props.topWeeklyUsersCache[currentWeek] === undefined) {
      getUsersWithMostPointsInWeek(currentWeek).then(userMostPoints => {
        this.props.addToTopWeeklyUsersCache(currentWeek, userMostPoints);
      });
    }
  }

  _onClick() {
    this.props.setWeekBeingViewed(0);
    this._generateCache(0);
  }

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
          <Pitch transfer={false} activeWeeklyTeam={this.props.activeTeam} />
        </div>
      </div>
    );
  }
}

export default Transactions;
