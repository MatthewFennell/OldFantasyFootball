import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Team from '../../Components/Team/Team';
import { getActiveTeam, getWeeklyTeamCache } from '../../Selectors/ActiveTeamSelector';
import { getTotalPoints } from '../../Selectors/AccountSelector';
import { setTransferMarket } from '../../Actions/TransferActions';
import { setAllCollegeTeams } from '../../Actions/AdminActions';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';
import {
  getWeekBeingViewed,
  getWeeklyPointsCache,
  getAverageWeeklyPointsCache,
  getTopWeeklyPlayerCache,
  getTopWeeklyUserCache,
  getTotalNumberOfWeeks
} from '../../Selectors/StatsSelector';
import { setTotalPoints } from '../../Actions/AccountActions';
import {
  setWeekBeingViewed,
  addToWeeklyPointsCache,
  addToAverageWeeklyPointsCache,
  addToTopWeeklyPlayersCache,
  addToTopWeeklyUsersCache,
  setTotalNumberOfWeeks
} from '../../Actions/StatsActions';

import { setRemainingBudget } from '../../Actions/TransferActions';

import { setTeam, addToWeeklyTeamCache } from '../../Actions/ActiveTeamActions';

const mapStateToProps = (state: State) => ({
  totalPoints: getTotalPoints(state),
  weekBeingViewed: getWeekBeingViewed(state),
  weeklyPointsCache: getWeeklyPointsCache(state),
  averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
  topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
  topWeeklyUsersCache: getTopWeeklyUserCache(state),
  activeTeam: getActiveTeam(state),
  weeklyTeamCache: getWeeklyTeamCache(state),
  totalNumberOfWeeks: getTotalNumberOfWeeks(state),
  allCollegeTeams: getAllCollegeTeams(state)
});

const mapDispatchToProps = {
  setTotalPoints,
  setWeekBeingViewed,
  addToWeeklyPointsCache,
  addToAverageWeeklyPointsCache,
  addToTopWeeklyPlayersCache,
  addToTopWeeklyUsersCache,
  setTeam,
  addToWeeklyTeamCache,
  setTotalNumberOfWeeks,
  setTransferMarket,
  setAllCollegeTeams,
  setRemainingBudget
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Team);
