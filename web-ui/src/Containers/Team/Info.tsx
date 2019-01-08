import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';
import { getTotalPoints } from '../../Selectors/AccountSelector';
import {
  getWeekBeingViewed,
  getPointsInActiveWeek,
  getWeeklyPointsCache
} from '../../Selectors/StatsSelector';
import { setTotalPoints } from '../../Actions/AccountActions';
import {
  setWeekBeingViewed,
  setPointsInActiveWeek,
  addToWeeklyPointsCache
} from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
  totalPoints: getTotalPoints(state),
  weekBeingViewed: getWeekBeingViewed(state),
  pointsInActiveWeek: getPointsInActiveWeek(state),
  weeklyPointsCache: getWeeklyPointsCache(state)
});

const mapDispatchToProps = {
  setTotalPoints,
  setWeekBeingViewed,
  setPointsInActiveWeek,
  addToWeeklyPointsCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
