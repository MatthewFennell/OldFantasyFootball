import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Stats from '../../Components/Team/Stats';
import {
  getAverageWeeklyPointsCache,
  getWeekBeingViewed,
  getTopWeeklyPlayerCache,
  getTopWeeklyUserCache
} from '../../Selectors/StatsSelector';

import { getRemainingBudget } from '../../Selectors/TransfersSelector';

const mapStateToProps = (state: State) => ({
  remainingBudget: getRemainingBudget(state),
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
