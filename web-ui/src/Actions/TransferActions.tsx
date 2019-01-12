import { FilteredPlayer } from '../Models/Interfaces/FilteredPlayer';

export enum ActionTypes {
  SET_REMAINING_BUDGET = 'SET_REMAINING_BUDGET',
  SET_REMAINING_TRANSFERS = 'SET_REMAINING_TRANSFERS',
  SET_FILTERED_PLAYERS = 'SET_FILTERED_PLAYERS'
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
  payload: { filteredPlayers: FilteredPlayer[] };
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

export const setFilteredPlayers = (filteredPlayers: FilteredPlayer[]): SetFilteredPlayers => {
  return {
    type: ActionTypes.SET_FILTERED_PLAYERS,
    payload: { filteredPlayers }
  };
};

export type Action = SetRemainingBudget | SetRemainingTransfers | SetFilteredPlayers;
