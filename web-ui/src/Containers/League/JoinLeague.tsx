import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import JoinLeague from '../../Components/Leagues/JoinLeague';
import { addToLeagueCache } from '../../Actions/LeagueActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
  addToLeagueCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(JoinLeague);
