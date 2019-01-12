import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import TransfersRow from '../../Components/Transfers/TransfersRow';
import { addPlayer } from '../../Actions/ActiveTeamActions';
import { getActiveTeam } from '../../Selectors/ActiveTeamSelector';
import { setRemainingBudget } from '../../Actions/TransferActions';
import { getRemainingBudget } from '../../Selectors/TransfersSelector';

const mapStateToProps = (state: State) => ({
  activeTeam: getActiveTeam(state),
  remainingBudget: getRemainingBudget(state)
});

const mapDispatchToProps = {
  addPlayer,
  setRemainingBudget
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(TransfersRow);
