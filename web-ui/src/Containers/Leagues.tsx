import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Leagues from '../Components/Leagues/Leagues';
import { getLeagueCache, getLeaguePageBeingViewed } from '../Selectors/LeagueSelector';
import { addToLeagueCache, setLeaguePageBeingViewed } from '../Actions/LeagueActions';

const mapStateToProps = (state: State) => ({
  leagueCache: getLeagueCache(state),
  leaguePageBeingViewed: getLeaguePageBeingViewed(state)
});

const mapDispatchToProps = {
  addToLeagueCache,
  setLeaguePageBeingViewed
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Leagues);
