import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getFilteredPlayersState = (state: State) => state.transfers;
export const getFilteredPlayers = createSelector([getFilteredPlayersState], a => a.filteredPlayers);

const getTransferMarketOpenState = (state: State) => state.transfers;
export const getTransferMarketOpen = createSelector(
	[getTransferMarketOpenState],
	a => a.transferMarketOpen
);

const getCurrentTransferTeamState = (state: State) => state.transfers;
export const getCurrentTransferTeam = createSelector([getCurrentTransferTeamState], a => a.currentTransferTeam);

const getOriginalTransferTeamState = (state: State) => state.transfers;
export const getOriginalTransferTeam = createSelector([getOriginalTransferTeamState], a => a.originalTransferTeam);

const getPlayersToAddState = (state: State) => state.transfers;
export const getPlayersToAdd = createSelector([getPlayersToAddState], a => a.playersToAdd);

const getPlayersToRemoveState = (state: State) => state.transfers;
export const getPlayersToRemove = createSelector([getPlayersToRemoveState], a => a.playersToRemove);
