import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Transfers from '../../Components/Transfers/Transfers';
import { setTeam } from '../../Actions/ActiveTeamActions';
import {
	getFilteredPlayers,
	getTransferMarketOpen,
} from '../../Selectors/TransfersSelector';
import { getTeam } from '../../Selectors/ActiveTeamSelector';

import { getRemainingBudget } from '../../Selectors/StatsSelector';

import { setBudget } from '../../Actions/StatsActions';
import { getAccountId } from '../../Selectors/AccountSelector';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';

import { setFilteredPlayers } from '../../Actions/TransferActions';

const mapStateToProps = (state: State) => ({
	remainingBudget: getRemainingBudget(state),
	filteredPlayers: getFilteredPlayers(state),
	transfersMarketOpen: getTransferMarketOpen(state),
	accountId: getAccountId(state),
	team: getTeam(state),
	allCollegeTeams: getAllCollegeTeams(state)
});

const mapDispatchToProps = {
	setBudget,
	setTeam,
	setFilteredPlayers,
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);
