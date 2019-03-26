import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
  SET_REMAINING_BUDGET = 'SET_REMAINING_BUDGET',
  SET_FILTERED_PLAYERS = 'SET_FILTERED_PLAYERS',
  SET_TRANSFER_MARKET = 'SET_TRANSFER_MARKET',
  REVERSE_FILTERED_PLAYERS = 'REVERSE_FILTERED_PLAYERS'
}

export interface SetRemainingBudget {
  type: ActionTypes.SET_REMAINING_BUDGET;
  payload: { remainingBudget: number };
}

export interface SetFilteredPlayers {
  type: ActionTypes.SET_FILTERED_PLAYERS;
  payload: { filteredPlayers: PlayerDTO[] };
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

export const setFilteredPlayers = (filteredPlayers: PlayerDTO[]): SetFilteredPlayers => {
	return {
		type: ActionTypes.SET_FILTERED_PLAYERS,
		payload: { filteredPlayers }
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
  | SetFilteredPlayers
  | SetTransferMarket
  | ReverseFilteredPlayers;
