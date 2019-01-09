import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Leagues from '../Components/Leagues/Leagues';
import { getLeagueCache } from '../Selectors/LeagueSelector';
import { addToLeagueCache } from '../Actions/LeagueActions';

const mapStateToProps = (state: State) => ({
  leagueCache: getLeagueCache(state)
});

const mapDispatchToProps = {
  addToLeagueCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Leagues);
