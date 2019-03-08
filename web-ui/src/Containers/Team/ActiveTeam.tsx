import { connect } from 'react-redux';
import { addPlayer, setTeam } from '../../Actions/ActiveTeamActions';
import ActiveTeam from '../../Components/Team/ActiveTeam';
import { State } from '../../Reducers/root';
import { getActiveTeam } from '../../Selectors/ActiveTeamSelector';

const mapStateToProps = (state: State) => ({
	activeTeam: getActiveTeam(state)
});

const mapDispatchToProps = {
	addPlayer,
	setTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(ActiveTeam);
