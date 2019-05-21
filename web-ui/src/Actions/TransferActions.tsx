import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
  SET_FILTERED_PLAYERS = 'SET_FILTERED_PLAYERS',
  SET_TRANSFER_MARKET = 'SET_TRANSFER_MARKET',
  REVERSE_FILTERED_PLAYERS = 'REVERSE_FILTERED_PLAYERS',
  SET_CURRENT_TRANSFER_TEAM = 'SET_CURRENT_TRANSFER_TEAM',
  SET_ORIGINAL_TRANSFER_TEAM = 'SET_ORIGINAL_TRANSFER_TEAM',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  ADD_PLAYER = 'ADD_PLAYER',
  CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED = 'CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED',
  RESET_CHANGES = 'RESET_CHANGES',
}

export interface ResetChanges {
  type: ActionTypes.RESET_CHANGES;
  payload: { };
}

export interface ClearPlayersBeingAddedAndRemoved {
  type: ActionTypes.CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED;
  payload: { };
}

export interface AddPlayer {
  type: ActionTypes.ADD_PLAYER;
  payload: { playerToAdd: PlayerDTO };
}

export interface RemovePlayer {
  type: ActionTypes.REMOVE_PLAYER;
  payload: { playerToRemove: PlayerDTO };
}

export interface SetCurrentTransferTeam {
  type: ActionTypes.SET_CURRENT_TRANSFER_TEAM;
  payload: { currentTransferTeam: PlayerDTO[] };
}

export interface SetOriginalTransferTeam {
  type: ActionTypes.SET_ORIGINAL_TRANSFER_TEAM;
  payload: { originalTransferTeam: PlayerDTO[] };
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

export const resetChanges = (): ResetChanges => {
	return {
		type: ActionTypes.RESET_CHANGES,
		payload: { }
	};
};

export const addPlayer = (playerToAdd: PlayerDTO): AddPlayer => {
	return {
		type: ActionTypes.ADD_PLAYER,
		payload: { playerToAdd }
	};
};

export const removePlayer = (playerToRemove: PlayerDTO): RemovePlayer => {
	return {
		type: ActionTypes.REMOVE_PLAYER,
		payload: { playerToRemove }
	};
};

export const setCurrentTransferTeam = (currentTransferTeam: PlayerDTO[]): SetCurrentTransferTeam => {
	return {
		type: ActionTypes.SET_CURRENT_TRANSFER_TEAM,
		payload: { currentTransferTeam }
	};
};

export const setOriginalTransferTeam = (originalTransferTeam: PlayerDTO[]): SetOriginalTransferTeam => {
	return {
		type: ActionTypes.SET_ORIGINAL_TRANSFER_TEAM,
		payload: { originalTransferTeam }
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

export const clearPlayersBeingAddedAndRemoved = (): ClearPlayersBeingAddedAndRemoved => {
	return {
		type: ActionTypes.CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED,
		payload: {}
	};
};

export type Action =
  | SetFilteredPlayers
  | SetTransferMarket
  | ReverseFilteredPlayers
  | SetCurrentTransferTeam
  | SetOriginalTransferTeam
  | RemovePlayer
  | AddPlayer
  | ClearPlayersBeingAddedAndRemoved
  | ResetChanges;
