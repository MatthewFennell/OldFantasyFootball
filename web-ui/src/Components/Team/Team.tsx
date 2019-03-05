import * as React from 'react';
import '../../Style/Team/Team.css';
import '../../Style/Team/PitchLayout/Pitch.css';
import Info from '../../Containers/Team/Info';
import Stats from '../../Containers/Team/Stats';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { getNumberOfWeeks, getTransferStatus } from '../../Services/Weeks/WeeksService';
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
import { getCollegeTeams } from '../../Services/CollegeTeam/CollegeTeamService';
import { getRemainingBudget } from '../../Services/User/UserService';

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
  setTransferMarket: (transferMarket: boolean) => void;

  setAllCollegeTeams: (teams: CollegeTeam[]) => void;
  allCollegeTeams: CollegeTeam[];

  setRemainingBudget: (budget: number) => void;
}

interface TransactionsState {}

class Transactions extends React.Component<TransactionsProps, TransactionsState> {
  constructor(props: TransactionsProps) {
    super(props);
    this._generateCache = this._generateCache.bind(this);
  }

  componentDidMount() {
    let header: HTMLElement | null = document.getElementById('header');
    if (header != null) {
      header.hidden = false;
    }

    // Get the total number of weeks
    getNumberOfWeeks().then(currentWeek => {
      // Automatically start viewing the latest
      this.props.setWeekBeingViewed(currentWeek);
      this.props.setTotalNumberOfWeeks(currentWeek);
      this._generateCache(currentWeek);

      for (let x = 0; x < currentWeek; x++) {
        this._generateCache(x);
      }

      getTeamForUserInWeek(currentWeek).then(activeTeam => {
        this.props.setTeam(activeTeam);
      });

      getRemainingBudget().then(response => {
        this.props.setRemainingBudget(response);
      });
    });

    getTransferStatus().then(response => {
      this.props.setTransferMarket(response);
    });

    if (this.props.allCollegeTeams.length === 0) {
      getCollegeTeams('alphabetical').then(response => {
        this.props.setAllCollegeTeams(response);
      });
    }

    if (this.props.weeklyTeamCache[-1] === undefined) {
      getTeamForUserInWeek(-1).then(weeklyTeam => {
        this.props.addToWeeklyTeamCache(-1, weeklyTeam);
      });
    }
  }

  _generateCache(currentWeek: number) {
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
