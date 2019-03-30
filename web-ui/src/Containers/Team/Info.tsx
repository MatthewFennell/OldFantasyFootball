import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';
import {
	getWeekBeingViewed,
	getTotalNumberOfWeeks,
	getTotalPointsCache,
	getWeeklyPoints
} from '../../Selectors/StatsSelector';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';

import { setTeamCache } from '../../Actions/ActiveTeamActions';

import { setWeekBeingViewed, setTotalPointsCache, setWeeklyPointsCache } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
	weekBeingViewed: getWeekBeingViewed(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
	totalPointsCache: getTotalPointsCache(state),
	userBeingViewed: getUserBeingViewed(state),
	weeklyPoints: getWeeklyPoints(state)
});

const mapDispatchToProps = {
	setWeekBeingViewed,
	setTeamCache,
	setTotalPointsCache,
	setWeeklyPointsCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
