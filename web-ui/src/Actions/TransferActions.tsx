import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
  SET_REMAINING_BUDGET = 'SET_REMAINING_BUDGET',
  SET_REMAINING_TRANSFERS = 'SET_REMAINING_TRANSFERS',
  SET_FILTERED_PLAYERS = 'SET_FILTERED_PLAYERS',
  ADD_TO_PLAYERS_BEING_ADDED = 'ADD_TO_PLAYERS_BEING_ADDED',
  REMOVE_FROM_PLAYERS_BEING_ADDED = 'REMOVE_FROM_PLAYERS_BEING_ADDED',
  ADD_TO_PLAYERS_BEING_REMOVED = 'ADD_TO_PLAYERS_BEING_REMOVED',
  REMOVE_FROM_PLAYERS_BEING_REMOVED = 'REMOVE_FROM_PLAYERS_BEING_REMOVED',
  CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED = 'CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED',
  SET_TRANSFER_MARKET = 'SET_TRANSFER_MARKET',
  REVERSE_FILTERED_PLAYERS = 'REVERSE_FILTERED_PLAYERS'
}

export interface SetRemainingBudget {
  type: ActionTypes.SET_REMAINING_BUDGET;
  payload: { remainingBudget: number };
}

export interface SetRemainingTransfers {
  type: ActionTypes.SET_REMAINING_TRANSFERS;
  payload: { remainingTransfers: number };
}

export interface SetFilteredPlayers {
  type: ActionTypes.SET_FILTERED_PLAYERS;
  payload: { filteredPlayers: PlayerDTO[] };
}

export interface AddToPlayersBeingAdded {
  type: ActionTypes.ADD_TO_PLAYERS_BEING_ADDED;
  payload: { playerBeingAdded: PlayerDTO };
}

export interface RemoveFromPlayersBeingAdded {
  type: ActionTypes.REMOVE_FROM_PLAYERS_BEING_ADDED;
  payload: { indexToRemove: number };
}

export interface AddToPlayersBeingRemoved {
  type: ActionTypes.ADD_TO_PLAYERS_BEING_REMOVED;
  payload: { playerBeingAdded: PlayerDTO };
}

export interface RemoveFromPlayersBeingRemoved {
  type: ActionTypes.REMOVE_FROM_PLAYERS_BEING_REMOVED;
  payload: { indexToRemove: number };
}

export interface ClearPlayersBeingAddedAndRemoved {
  type: ActionTypes.CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED;
  payload: {};
}

export interface SetTransferMarket {
  type: ActionTypes.SET_TRANSFER_MARKET;
  payload: { transferMarketOpen: boolean };
}

export interface ReverseFilteredPlayers {
  type: ActionTypes.REVERSE_FILTERED_PLAYERS;
  payload: {};
}

export const setRemainingBudget = (remainingBudget: number): SetRemainingBudget => {
	return {
		type: ActionTypes.SET_REMAINING_BUDGET,
		payload: { remainingBudget }
	};
};

export const setRemainingTransfers = (remainingTransfers: number): SetRemainingTransfers => {
	return {
		type: ActionTypes.SET_REMAINING_TRANSFERS,
		payload: { remainingTransfers }
	};
};

export const setFilteredPlayers = (filteredPlayers: PlayerDTO[]): SetFilteredPlayers => {
	return {
		type: ActionTypes.SET_FILTERED_PLAYERS,
		payload: { filteredPlayers }
	};
};

export const addToPlayerBeingAdded = (playerBeingAdded: PlayerDTO): AddToPlayersBeingAdded => {
	return {
		type: ActionTypes.ADD_TO_PLAYERS_BEING_ADDED,
		payload: { playerBeingAdded }
	};
};

export const removeFromPlayersBeingAdded = (indexToRemove: number): RemoveFromPlayersBeingAdded => {
	return {
		type: ActionTypes.REMOVE_FROM_PLAYERS_BEING_ADDED,
		payload: { indexToRemove }
	};
};

export const clearPlayersBeingAddedAndRemoved = (): ClearPlayersBeingAddedAndRemoved => {
	return {
		type: ActionTypes.CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED,
		payload: {}
	};
};

export const addToPlayerBeingRemoved = (playerBeingAdded: PlayerDTO): AddToPlayersBeingRemoved => {
	return {
		type: ActionTypes.ADD_TO_PLAYERS_BEING_REMOVED,
		payload: { playerBeingAdded }
	};
};

export const removeFromPlayersBeingRemoved = (
	indexToRemove: number
): RemoveFromPlayersBeingRemoved => {
	return {
		type: ActionTypes.REMOVE_FROM_PLAYERS_BEING_REMOVED,
		payload: { indexToRemove }
	};
};

export const setTransferMarket = (transferMarketOpen: boolean): SetTransferMarket => {
	return {
		type: ActionTypes.SET_TRANSFER_MARKET,
		payload: { transferMarketOpen }
	};
};

export const reverseFilteredPlayers = (): ReverseFilteredPlayers => {
	return {
		type: ActionTypes.REVERSE_FILTERED_PLAYERS,
		payload: {}
	};
};

export type Action =
  | SetRemainingBudget
  | SetRemainingTransfers
  | SetFilteredPlayers
  | AddToPlayersBeingAdded
  | RemoveFromPlayersBeingAdded
  | AddToPlayersBeingRemoved
  | RemoveFromPlayersBeingRemoved
  | ClearPlayersBeingAddedAndRemoved
  | SetTransferMarket
  | ReverseFilteredPlayers;
