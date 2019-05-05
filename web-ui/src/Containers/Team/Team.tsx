import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Team from '../../Components/Team/Team';
import { getUserBeingViewed, getTeam, getTeamToRender } from '../../Selectors/ActiveTeamSelector';
import { setPageBeingViewed } from '../../Actions/AccountActions';
import {
	getWeekBeingViewed,
	getTotalNumberOfWeeks,
} from '../../Selectors/StatsSelector';

import { setTeam } from '../../Actions/ActiveTeamActions';
import { getAccountId } from '../../Selectors/AccountSelector';

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
	team: getTeam(state),
	leagues: getLeagues(state),
	accountId: getAccountId(state),
	teamToRender: getTeamToRender(state)
});

const mapDispatchToProps = {
	setLeaguePageBeingViewed,
	setLeagueCode,
	setPageBeingViewed,
	setIsLeagueAdmin,
	setLeagueRankings,
	setTeam,
	setLeagues
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Team);
