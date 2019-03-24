import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Team from '../../Components/Team/Team';
import { getActiveTeam, getWeeklyTeamCache } from '../../Selectors/ActiveTeamSelector';
import { getTotalPoints } from '../../Selectors/AccountSelector';
import { setPageBeingViewed } from '../../Actions/AccountActions';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';
import {
	getWeekBeingViewed,
	getWeeklyPointsCache,
	getAverageWeeklyPointsCache,
	getTopWeeklyPlayerCache,
	getTopWeeklyUserCache,
	getTotalNumberOfWeeks,
	getMostValuable
} from '../../Selectors/StatsSelector';

import {
	setLeaguePageBeingViewed,
} from '../../Actions/LeagueActions';

import { getLeagueCache } from '../../Selectors/LeagueSelector';

const mapStateToProps = (state: State) => ({
	leagueCache: getLeagueCache(state),
	totalPoints: getTotalPoints(state),
	weekBeingViewed: getWeekBeingViewed(state),
	weeklyPointsCache: getWeeklyPointsCache(state),
	averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
	topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
	topWeeklyUsersCache: getTopWeeklyUserCache(state),
	activeTeam: getActiveTeam(state),
	weeklyTeamCache: getWeeklyTeamCache(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
	allCollegeTeams: getAllCollegeTeams(state),
	mostValuable: getMostValuable(state)
});

const mapDispatchToProps = {
	setLeaguePageBeingViewed,
	setPageBeingViewed
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Team);
