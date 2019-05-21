import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { setTeam } from '../../Actions/ActiveTeamActions';
import {
	getFilteredPlayers,
	getTransferMarketOpen,
	getCurrentTransferTeam,
	getOriginalTransferTeam,
	getPlayersToAdd,
	getPlayersToRemove
} from '../../Selectors/TransfersSelector';
import { getTeam } from '../../Selectors/ActiveTeamSelector';

import { getRemainingBudget } from '../../Selectors/StatsSelector';

import { setBudget } from '../../Actions/StatsActions';
import { getAccountId } from '../../Selectors/AccountSelector';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';

import {	setFilteredPlayers,
	setCurrentTransferTeam,
	setOriginalTransferTeam,
	removePlayer,
	addPlayer,
	clearPlayersBeingAddedAndRemoved,
	resetChanges
}	from '../../Actions/TransferActions';

const mapStateToProps = (state: State) => ({
	remainingBudget: getRemainingBudget(state),
	filteredPlayers: getFilteredPlayers(state),
	transfersMarketOpen: getTransferMarketOpen(state),
	accountId: getAccountId(state),
	team: getTeam(state),
	allCollegeTeams: getAllCollegeTeams(state),
	currentTransferTeam: getCurrentTransferTeam(state),
	originalTransferTeam: getOriginalTransferTeam(state),
	playersToAdd: getPlayersToAdd(state),
	playersToRemove: getPlayersToRemove(state)
});

const mapDispatchToProps = {
	setBudget,
	setTeam,
	setFilteredPlayers,
	setOriginalTransferTeam,
	setCurrentTransferTeam,
	removePlayer,
	addPlayer,
	resetChanges,
	clearPlayersBeingAddedAndRemoved
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
