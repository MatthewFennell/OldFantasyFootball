import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Team from '../../Components/Team/Team';
import { getUserBeingViewed, getTeamCache } from '../../Selectors/ActiveTeamSelector';
import { setPageBeingViewed } from '../../Actions/AccountActions';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';
import {
	getWeekBeingViewed,
	getAverageWeeklyPointsCache,
	getTopWeeklyPlayerCache,
	getTopWeeklyUserCache,
	getTotalNumberOfWeeks,
} from '../../Selectors/StatsSelector';

import { setTeamCache } from '../../Actions/ActiveTeamActions';

import {
	setLeaguePageBeingViewed,
	setLeagueRankings,
	setIsLeagueAdmin,
	setLeagueCode
} from '../../Actions/LeagueActions';

import { getLeagueCache, getIsLeagueAdmin,
	getLeagueCode } from '../../Selectors/LeagueSelector';

const mapStateToProps = (state: State) => ({
	leagueCache: getLeagueCache(state),
	weekBeingViewed: getWeekBeingViewed(state),
	averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
	topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
	topWeeklyUsersCache: getTopWeeklyUserCache(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
	allCollegeTeams: getAllCollegeTeams(state),
	leagueCode: getLeagueCode(state),
	isAdmin: getIsLeagueAdmin(state),
	userBeingViewed: getUserBeingViewed(state),
	teamCache: getTeamCache(state)
});

const mapDispatchToProps = {
	setLeaguePageBeingViewed,
	setLeagueCode,
	setPageBeingViewed,
	setIsLeagueAdmin,
	setLeagueRankings,
	setTeamCache,
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Team);
