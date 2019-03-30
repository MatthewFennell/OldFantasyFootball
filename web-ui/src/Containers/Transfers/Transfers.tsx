import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { setTeamCache } from '../../Actions/ActiveTeamActions';
import { setRemainingBudget } from '../../Actions/TransferActions';
import {
	getFilteredPlayers,
	getTransferMarketOpen,
} from '../../Selectors/TransfersSelector';
import { getTeamCache } from '../../Selectors/ActiveTeamSelector';

import {
	getRemainingBudget
} from '../../Selectors/StatsSelector';

import { setBudget } from '../../Actions/StatsActions';
import { getAccountId } from '../../Selectors/AccountSelector';

const mapStateToProps = (state: State) => ({
	remainingBudget: getRemainingBudget(state),
	filteredPlayers: getFilteredPlayers(state),
	transfersMarketOpen: getTransferMarketOpen(state),
	accountId: getAccountId(state),
	teamCache: getTeamCache(state)
});

const mapDispatchToProps = {
	setBudget,
	setRemainingBudget,
	setTeamCache
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
