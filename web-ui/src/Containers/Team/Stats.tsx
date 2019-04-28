import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Stats from '../../Components/Team/Stats';
import {
	getWeekBeingViewed,
	getTopWeeklyUser,
	getRemainingBudget,
	getMostValuable,
	getTotalNumberOfWeeks,
	getMostValuablePlayerName,
	getMostValuablePlayerPointsName,
	getTopWeeklyPlayerName,
	getTopWeeklyPlayerPoints,
	getTopWeeklyUserName,
	getTopWeeklyUserPoints,
	getRemainingBudgetOfUser,
	getAverageWeeklyPointsOfWeek
} from '../../Selectors/StatsSelector';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';
import { setUserBeingViewed } from '../../Actions/ActiveTeamActions';
import { setBudget, setMostValuable } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
	remainingBudget: getRemainingBudget(state),
	weekBeingViewed: getWeekBeingViewed(state),
	topWeeklyUsers: getTopWeeklyUser(state),
	userBeingViewed: getUserBeingViewed(state),
	mostValuable: getMostValuable(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
	mostValuablePlayerName: getMostValuablePlayerName(state),
	mostValuablePlayerScore: getMostValuablePlayerPointsName(state),
	topWeeklyPlayerName: getTopWeeklyPlayerName(state),
	topWeeklyPlayerPoints: getTopWeeklyPlayerPoints(state),
	topWeeklyUserName: getTopWeeklyUserName(state),
	topWeeklyUserPoints: getTopWeeklyUserPoints(state),
	remainingBudgetOfUser: getRemainingBudgetOfUser(state),
	averageWeeklyPointsOfWeek: getAverageWeeklyPointsOfWeek(state)
});

const mapDispatchToProps = {
	setBudget,
	setMostValuable,
	setUserBeingViewed
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Stats);
