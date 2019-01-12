import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { setRemainingBudget, setRemainingTransfers } from '../../Actions/TransferActions';
import {
  getRemainingBudget,
  getRemainingTransfers,
  getFilteredPlayers
} from '../../Selectors/TransfersSelector';

const mapStateToProps = (state: State) => ({
  remainingBudget: getRemainingBudget(state),
  remainingTransfers: getRemainingTransfers(state),
  filteredPlayers: getFilteredPlayers(state)
});

const mapDispatchToProps = {
  setRemainingBudget,
  setRemainingTransfers
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
