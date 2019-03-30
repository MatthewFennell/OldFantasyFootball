import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';
import { getTotalPoints } from '../../Selectors/AccountSelector';
import {
	getWeekBeingViewed,
	getWeeklyPointsCache,
	getTotalNumberOfWeeks,
	getTotalPointsCache
} from '../../Selectors/StatsSelector';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';

import { setTeam } from '../../Actions/ActiveTeamActions';

import { setWeekBeingViewed, setTotalPointsCache } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
	totalPoints: getTotalPoints(state),
	weekBeingViewed: getWeekBeingViewed(state),
	weeklyPointsCache: getWeeklyPointsCache(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
	totalPointsCache: getTotalPointsCache(state),
	userBeingViewed: getUserBeingViewed(state)
});

const mapDispatchToProps = {
	setWeekBeingViewed,
	setTeam,
	setTotalPointsCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
