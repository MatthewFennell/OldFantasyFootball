import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Player from '../Components/Team/PitchLayout/Player';
import { getActiveTeam } from '../Selectors/ActiveTeamSelector';
import { setTeam, removeIndex } from '../Actions/ActiveTeamActions';
import { setRemainingBudget } from '../Actions/TransferActions';
import { getRemainingBudget } from '../Selectors/TransfersSelector';

const mapStateToProps = (state: State) => ({
  activeTeam: getActiveTeam(state),
  remainingBudget: getRemainingBudget(state)
});

const mapDispatchToProps = {
  setTeam,
  removeIndex,
  setRemainingBudget
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Player);
