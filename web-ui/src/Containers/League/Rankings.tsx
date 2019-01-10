import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Rankings from '../../Components/Leagues/RankingsTableBody';
import { getLeaguePageBeingViewed } from '../../Selectors/LeagueSelector';

const mapStateToProps = (state: State) => ({
  leaguePageBeingViewed: getLeaguePageBeingViewed(state)
});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Rankings);
