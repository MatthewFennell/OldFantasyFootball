import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { clearPlayersBeingAddedAndRemoved, setTransferMarket } from '../../Actions/TransferActions';
import {
  getFilteredPlayers,
  getPlayersBeingAdded,
  getPlayersBeingRemoved,
  getTransferMarketOpen
} from '../../Selectors/TransfersSelector';
import { getActiveTeam } from '../../Selectors/ActiveTeamSelector';
import { getRemainingBudget, getRemainingTransfers } from '../../Selectors/AccountSelector';

const mapStateToProps = (state: State) => ({
  remainingBudget: getRemainingBudget(state),
  remainingTransfers: getRemainingTransfers(state),
  filteredPlayers: getFilteredPlayers(state),
  activeTeam: getActiveTeam(state),
  playersBeingAdded: getPlayersBeingAdded(state),
  playersBeingRemoved: getPlayersBeingRemoved(state),
  transfersMarketOpen: getTransferMarketOpen(state)
});

const mapDispatchToProps = {
  clearPlayersBeingAddedAndRemoved,
  setTransferMarket
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
