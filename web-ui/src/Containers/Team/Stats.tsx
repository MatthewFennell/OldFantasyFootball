import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Stats from '../../Components/Team/Stats';
import {
	getAverageWeeklyPointsCache,
	getWeekBeingViewed,
	getTopWeeklyPlayerCache,
	getTopWeeklyUserCache,
	getRemainingBudget,
	getMostValuableCache
} from '../../Selectors/StatsSelector';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';

import { setBudget, setMostValuableCache } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
	remainingBudget: getRemainingBudget(state),
	averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
	weekBeingViewed: getWeekBeingViewed(state),
	topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
	topWeeklyUsersCache: getTopWeeklyUserCache(state),
	userBeingViewed: getUserBeingViewed(state),
	mostValuableCache: getMostValuableCache(state)
});

const mapDispatchToProps = {
	setBudget,
	setMostValuableCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Stats);
