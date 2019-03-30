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
	setLeagues
} from '../../Actions/LeagueActions';
import { setUserBeingViewed } from '../../Actions/ActiveTeamActions';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';

const mapStateToProps = (state: State) => ({
	isAdmin: getIsLeagueAdmin(state),
	leagueCode: getLeagueCode(state),
	leaguePageBeingViewed: getLeaguePageBeingViewed(state),
	leagueRankings: getLeagueRankings(state),
	userBeingViewed: getUserBeingViewed(state),
	leagues: getLeagues(state)
});

const mapDispatchToProps = {
	setLeagueCode,
	setLeaguePageBeingViewed,
	setLeagueRankings,
	setIsLeagueAdmin,
	setUserBeingViewed,
	setPageBeingViewed,
	setLeagues
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Leagues);
