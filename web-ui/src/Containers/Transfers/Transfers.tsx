import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { addPlayer, removeIndex } from '../../Actions/ActiveTeamActions';
import { clearPlayersBeingAddedAndRemoved,
	setRemainingBudget,
	addToPlayerBeingRemoved,
	addToPlayerBeingAdded,
	removeFromPlayersBeingAdded,
	removeFromPlayersBeingRemoved
} from '../../Actions/TransferActions';
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
	addPlayer,
	addToPlayerBeingAdded,
	clearPlayersBeingAddedAndRemoved,
	removeIndex,
	setRemainingBudget,
	addToPlayerBeingRemoved,
	removeFromPlayersBeingAdded,
	removeFromPlayersBeingRemoved
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
