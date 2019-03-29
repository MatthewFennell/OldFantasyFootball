import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getRemainingBudgetState = (state: State) => state.transfers;
export const getRemainingBudget = createSelector([getRemainingBudgetState], a => a.remainingBudget);

const getFilteredPlayersState = (state: State) => state.transfers;
export const getFilteredPlayers = createSelector([getFilteredPlayersState], a => a.filteredPlayers);

const getTransferMarketOpenState = (state: State) => state.transfers;
export const getTransferMarketOpen = createSelector(
	[getTransferMarketOpenState],
	a => a.transferMarketOpen
);
