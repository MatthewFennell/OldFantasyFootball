import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Leagues from '../../Components/Leagues/Leagues';
import {
	getLeagueCache,
	getLeaguePageBeingViewed,
	getLeagueRankings,
	getIsLeagueAdmin,
	getLeagueCode
} from '../../Selectors/LeagueSelector';
import {
	addToLeagueCache,
	setLeaguePageBeingViewed,
	setLeagueRankings,
	setIsLeagueAdmin,
	setLeagueCode
} from '../../Actions/LeagueActions';

const mapStateToProps = (state: State) => ({
	isAdmin: getIsLeagueAdmin(state),
	leagueCache: getLeagueCache(state),
	leagueCode: getLeagueCode(state),
	leaguePageBeingViewed: getLeaguePageBeingViewed(state),
	leagueRankings: getLeagueRankings(state)
});

const mapDispatchToProps = {
	addToLeagueCache,
	setLeagueCode,
	setLeaguePageBeingViewed,
	setLeagueRankings,
	setIsLeagueAdmin
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Leagues);
