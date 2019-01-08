import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';
import { getTotalPoints } from '../../Selectors/AccountSelector';
import { getWeekBeingViewed, getWeeklyPointsCache } from '../../Selectors/StatsSelector';

const mapStateToProps = (state: State) => ({
  totalPoints: getTotalPoints(state),
  weekBeingViewed: getWeekBeingViewed(state),
  weeklyPointsCache: getWeeklyPointsCache(state)
});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
