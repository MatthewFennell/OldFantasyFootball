import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
	SET_USER_BEING_VIEWED = 'SET_USER_BEING_VIEWED',
	SET_TEAM_CACHE = 'SET_TEAM_CACHE'
}

export interface SetUserBeingViewed {
  type: ActionTypes.SET_USER_BEING_VIEWED;
  payload: { user: string };
}

export interface SetTeamCache {
  type: ActionTypes.SET_TEAM_CACHE;
  payload: { user: string, week: number, team: PlayerDTO[] };
}

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

export type Action = SetUserBeingViewed | SetTeamCache;
