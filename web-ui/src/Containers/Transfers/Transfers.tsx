import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { addPlayer, removeIndex } from '../../Actions/ActiveTeamActions';
import { setRemainingBudget } from '../../Actions/TransferActions';
import {
	getFilteredPlayers,
	getTransferMarketOpen,
	getRemainingBudget
} from '../../Selectors/TransfersSelector';
import { getActiveTeam } from '../../Selectors/ActiveTeamSelector';

const mapStateToProps = (state: State) => ({
	remainingBudget: getRemainingBudget(state),
	filteredPlayers: getFilteredPlayers(state),
	activeTeam: getActiveTeam(state),
	transfersMarketOpen: getTransferMarketOpen(state)
});

const mapDispatchToProps = {
	addPlayer,
	removeIndex,
	setRemainingBudget,
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
