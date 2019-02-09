import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';
import { getTotalPoints } from '../../Selectors/AccountSelector';
import {
  getWeekBeingViewed,
  getWeeklyPointsCache,
  getTotalNumberOfWeeks
} from '../../Selectors/StatsSelector';

import { setTeam } from '../../Actions/ActiveTeamActions';

import { setWeekBeingViewed } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
  totalPoints: getTotalPoints(state),
  weekBeingViewed: getWeekBeingViewed(state),
  weeklyPointsCache: getWeeklyPointsCache(state),
  totalNumberOfWeeks: getTotalNumberOfWeeks(state)
});

const mapDispatchToProps = {
  setWeekBeingViewed,
  setTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
