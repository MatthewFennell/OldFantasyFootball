import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Transfers from '../Components/Transfers/Transfers';
import { setRemainingBudget, setRemainingTransfers } from '../Actions/TransferActions';
import { getRemainingBudget, getRemainingTransfers } from '../Selectors/TransfersSelector';

const mapStateToProps = (state: State) => ({
  remainingBudget: getRemainingBudget(state),
  remainingTransfers: getRemainingTransfers(state)
});

const mapDispatchToProps = {
  setRemainingBudget,
  setRemainingTransfers
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
