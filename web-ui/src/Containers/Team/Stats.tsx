import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Stats from '../../Components/Team/Stats';
import {
  getAverageWeeklyPointsCache,
  getWeekBeingViewed,
  getTopWeeklyPlayerCache,
  getTopWeeklyUserCache
} from '../../Selectors/StatsSelector';

const mapStateToProps = (state: State) => ({
  averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
  weekBeingViewed: getWeekBeingViewed(state),
  topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
  topWeeklyUsersCache: getTopWeeklyUserCache(state)
});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Stats);
