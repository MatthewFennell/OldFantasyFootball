import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import SaveTeam from '../../Components/Transfers/SaveTeam';
import { getActiveTeam } from '../../Selectors/ActiveTeamSelector';

const mapStateToProps = (state: State) => ({
  activeTeam: getActiveTeam(state)
});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(SaveTeam);
