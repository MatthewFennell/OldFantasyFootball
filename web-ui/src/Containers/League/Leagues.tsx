import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Leagues from '../../Components/Leagues/Leagues';
import {
	getLeaguePageBeingViewed,
	getLeagueRankings,
	getIsLeagueAdmin,
	getLeagueCode,
	getLeagues
} from '../../Selectors/LeagueSelector';
import { setPageBeingViewed } from '../../Actions/AccountActions';
import {
	setLeaguePageBeingViewed,
	setLeagueRankings,
	setIsLeagueAdmin,
	setLeagueCode,
	setLeagues,
	removeLeagues
} from '../../Actions/LeagueActions';
import { setUserBeingViewed, setTeam } from '../../Actions/ActiveTeamActions';
import { getUserBeingViewed, getTeam } from '../../Selectors/ActiveTeamSelector';
import { getAccountId } from '../../Selectors/AccountSelector';

import { getWeekBeingViewed } from '../../Selectors/StatsSelector';

const mapStateToProps = (state: State) => ({
	isAdmin: getIsLeagueAdmin(state),
	leagueCode: getLeagueCode(state),
	leaguePageBeingViewed: getLeaguePageBeingViewed(state),
	leagueRankings: getLeagueRankings(state),
	userBeingViewed: getUserBeingViewed(state),
	leagues: getLeagues(state),
	accountId: getAccountId(state),
	weekBeingViewed: getWeekBeingViewed(state),
	team: getTeam(state)
});

const mapDispatchToProps = {
	setLeagueCode,
	setLeaguePageBeingViewed,
	setLeagueRankings,
	setIsLeagueAdmin,
	setUserBeingViewed,
	setPageBeingViewed,
	setLeagues,
	removeLeagues,
	setTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Leagues);
