import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  SET_TEAM = 'SET_TEAM',
  ADD_TO_WEEKLY_TEAM_CACHE = 'ADD_TO_WEEKLY_TEAM_CACHE',
  REMOVE_INDEX = 'REMOVE_INDEX'
}

export interface AddPlayer {
  type: ActionTypes.ADD_PLAYER;
  payload: { player: PlayerDTO };
}

export interface SetTeam {
  type: ActionTypes.SET_TEAM;
  payload: { activeTeam: PlayerDTO[] };
}

export interface AddToWeeklyTeamCache {
  type: ActionTypes.ADD_TO_WEEKLY_TEAM_CACHE;
  payload: { weekId: number; team: PlayerDTO[] };
}

export interface RemoveIndex {
  type: ActionTypes.REMOVE_INDEX;
  payload: { indexToRemove: number };
}

export const addPlayer = (player: PlayerDTO): AddPlayer => {
	return {
		type: ActionTypes.ADD_PLAYER,
		payload: {
			player
		}
	};
};

export const setTeam = (activeTeam: PlayerDTO[]): SetTeam => {
	return {
		type: ActionTypes.SET_TEAM,
		payload: {
			activeTeam
		}
	};
};

export const removeIndex = (indexToRemove: number): RemoveIndex => {
	return {
		type: ActionTypes.REMOVE_INDEX,
		payload: {
			indexToRemove
		}
	};
};

export const addToWeeklyTeamCache = (weekId: number, team: PlayerDTO[]): AddToWeeklyTeamCache => {
	return {
		type: ActionTypes.ADD_TO_WEEKLY_TEAM_CACHE,
		payload: { weekId, team }
	};
};

export type Action = AddPlayer | SetTeam | AddToWeeklyTeamCache | RemoveIndex;
