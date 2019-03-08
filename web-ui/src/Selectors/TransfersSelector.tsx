import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getRemainingBudgetState = (state: State) => state.transfers;
export const getRemainingBudget = createSelector([getRemainingBudgetState], a => a.remainingBudget);

const getRemainingTransfersState = (state: State) => state.transfers;
export const getRemainingTransfers = createSelector(
	[getRemainingTransfersState],
	a => a.remainingTransfers
);

const getFilteredPlayersState = (state: State) => state.transfers;
export const getFilteredPlayers = createSelector([getFilteredPlayersState], a => a.filteredPlayers);

const getPlayersBeingAddedState = (state: State) => state.transfers;
export const getPlayersBeingAdded = createSelector(
	[getPlayersBeingAddedState],
	a => a.playersBeingAdded
);

const getPlayersBeingRemovedState = (state: State) => state.transfers;
export const getPlayersBeingRemoved = createSelector(
	[getPlayersBeingRemovedState],
	a => a.playersBeingRemoved
);

const getTransferMarketOpenState = (state: State) => state.transfers;
export const getTransferMarketOpen = createSelector(
	[getTransferMarketOpenState],
	a => a.transferMarketOpen
);
