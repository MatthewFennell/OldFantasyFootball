import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Team from '../../Components/Team/Team';
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

const mapStateToProps = (state: State) => ({
  totalPoints: getTotalPoints(state),
  weekBeingViewed: getWeekBeingViewed(state),
  weeklyPointsCache: getWeeklyPointsCache(state),
  averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
  topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
  topWeeklyUsersCache: getTopWeeklyUserCache(state)
});

const mapDispatchToProps = {
  setTotalPoints,
  setWeekBeingViewed,
  addToWeeklyPointsCache,
  addToAverageWeeklyPointsCache,
  addToTopWeeklyPlayersCache,
  addToTopWeeklyUsersCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Team);
