import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { removeIndex } from '../../Actions/ActiveTeamActions';
import { clearPlayersBeingAddedAndRemoved,
	setRemainingBudget,
	addToPlayerBeingRemoved,
	removeFromPlayersBeingAdded } from '../../Actions/TransferActions';
import {
	getFilteredPlayers,
	getPlayersBeingAdded,
	getPlayersBeingRemoved,
	getTransferMarketOpen,
	getRemainingBudget
} from '../../Selectors/TransfersSelector';
import { getActiveTeam } from '../../Selectors/ActiveTeamSelector';
import { getRemainingTransfers } from '../../Selectors/AccountSelector';

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
	removeIndex,
	setRemainingBudget,
	addToPlayerBeingRemoved,
	removeFromPlayersBeingAdded
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
