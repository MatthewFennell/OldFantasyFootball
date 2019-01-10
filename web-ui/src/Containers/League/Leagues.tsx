import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Leagues from '../../Components/Leagues/Leagues';
import {
  getLeagueCache,
  getLeaguePageBeingViewed,
  getLeagueRankings
} from '../../Selectors/LeagueSelector';
import {
  addToLeagueCache,
  setLeaguePageBeingViewed,
  setLeagueRankings
} from '../../Actions/LeagueActions';

const mapStateToProps = (state: State) => ({
  leagueCache: getLeagueCache(state),
  leaguePageBeingViewed: getLeaguePageBeingViewed(state),
  leagueRankings: getLeagueRankings(state)
});

const mapDispatchToProps = {
  addToLeagueCache,
  setLeaguePageBeingViewed,
  setLeagueRankings
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Leagues);
