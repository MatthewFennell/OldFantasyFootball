import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Team from '../../Components/Team/Team';
import { getActiveTeam } from '../../Selectors/ActiveTeamSelector';
import { getTotalPoints } from '../../Selectors/AccountSelector';
import {
  getWeekBeingViewed,
  getWeeklyPointsCache,
  getAverageWeeklyPointsCache,
  getTopWeeklyPlayerCache,
  getTopWeeklyUserCache
} from '../../Selectors/StatsSelector';
import { setTotalPoints } from '../../Actions/AccountActions';
import {
  setWeekBeingViewed,
  addToWeeklyPointsCache,
  addToAverageWeeklyPointsCache,
  addToTopWeeklyPlayersCache,
  addToTopWeeklyUsersCache
} from '../../Actions/StatsActions';

import { setTeam } from '../../Actions/ActiveTeamActions';

const mapStateToProps = (state: State) => ({
  totalPoints: getTotalPoints(state),
  weekBeingViewed: getWeekBeingViewed(state),
  weeklyPointsCache: getWeeklyPointsCache(state),
  averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
  topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
  topWeeklyUsersCache: getTopWeeklyUserCache(state),
  activeTeam: getActiveTeam(state)
});

const mapDispatchToProps = {
  setTotalPoints,
  setWeekBeingViewed,
  addToWeeklyPointsCache,
  addToAverageWeeklyPointsCache,
  addToTopWeeklyPlayersCache,
  addToTopWeeklyUsersCache,
  setTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Team);
