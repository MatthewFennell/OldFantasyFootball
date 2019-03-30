import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Stats from '../../Components/Team/Stats';
import {
	getAverageWeeklyPointsCache,
	getWeekBeingViewed,
	getTopWeeklyPlayerCache,
	getTopWeeklyUserCache,
	getMostValuable,
	getRemainingBudget
} from '../../Selectors/StatsSelector';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';

import { setBudget } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
	remainingBudget: getRemainingBudget(state),
	averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
	weekBeingViewed: getWeekBeingViewed(state),
	topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
	topWeeklyUsersCache: getTopWeeklyUserCache(state),
	mostValuable: getMostValuable(state),
	userBeingViewed: getUserBeingViewed(state),
});

const mapDispatchToProps = {
	setBudget
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Stats);
