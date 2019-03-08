import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import CreateLeague from '../../Components/Leagues/CreateLeague';
import { addToLeagueCache } from '../../Actions/LeagueActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
	addToLeagueCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(CreateLeague);
