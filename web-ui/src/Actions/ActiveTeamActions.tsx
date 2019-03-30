import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  SET_TEAM = 'SET_TEAM',
  ADD_TO_WEEKLY_TEAM_CACHE = 'ADD_TO_WEEKLY_TEAM_CACHE',
	REMOVE_INDEX = 'REMOVE_INDEX',
	SET_USER_BEING_VIEWED = 'SET_USER_BEING_VIEWED',
	SET_TEAM_CACHE = 'SET_TEAM_CACHE'
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

export interface SetUserBeingViewed {
  type: ActionTypes.SET_USER_BEING_VIEWED;
  payload: { user: string };
}

export interface SetTeamCache {
  type: ActionTypes.SET_TEAM_CACHE;
  payload: { user: string, week: number, team: PlayerDTO[] };
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

export const setUserBeingViewed = (user: string): SetUserBeingViewed => {
	return {
		type: ActionTypes.SET_USER_BEING_VIEWED,
		payload: { user }
	};
};

export const setTeamCache = (user: string, week: number, team: PlayerDTO[]): SetTeamCache => {
	return {
		type: ActionTypes.SET_TEAM_CACHE,
		payload: { user, week, team }
	};
};

export type Action = AddPlayer | SetTeam | AddToWeeklyTeamCache | RemoveIndex | SetUserBeingViewed | SetTeamCache;
