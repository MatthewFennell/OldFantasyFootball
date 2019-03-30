import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Team from '../../Components/Team/Team';
import { getUserBeingViewed, getTeamCache } from '../../Selectors/ActiveTeamSelector';
import { setPageBeingViewed } from '../../Actions/AccountActions';
import {
	getWeekBeingViewed,
	getTotalNumberOfWeeks,
} from '../../Selectors/StatsSelector';

import { setTeamCache } from '../../Actions/ActiveTeamActions';

import {
	setLeaguePageBeingViewed,
	setLeagueRankings,
	setIsLeagueAdmin,
	setLeagueCode,
	setLeagues
} from '../../Actions/LeagueActions';

import { getIsLeagueAdmin,
	getLeagueCode, getLeagues } from '../../Selectors/LeagueSelector';

const mapStateToProps = (state: State) => ({
	weekBeingViewed: getWeekBeingViewed(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
	leagueCode: getLeagueCode(state),
	isAdmin: getIsLeagueAdmin(state),
	userBeingViewed: getUserBeingViewed(state),
	teamCache: getTeamCache(state),
	leagues: getLeagues(state)
});

const mapDispatchToProps = {
	setLeaguePageBeingViewed,
	setLeagueCode,
	setPageBeingViewed,
	setIsLeagueAdmin,
	setLeagueRankings,
	setTeamCache,
	setLeagues
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Team);
