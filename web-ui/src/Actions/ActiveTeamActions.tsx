import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
	SET_USER_BEING_VIEWED = 'SET_USER_BEING_VIEWED',
	SET_TEAM = 'SET_TEAM'
}

export interface SetUserBeingViewed {
  type: ActionTypes.SET_USER_BEING_VIEWED;
  payload: { user: string };
}

export interface SetTeam {
  type: ActionTypes.SET_TEAM;
  payload: { user: string, week: number, team: PlayerDTO[] };
}

export const setUserBeingViewed = (user: string): SetUserBeingViewed => {
	return {
		type: ActionTypes.SET_USER_BEING_VIEWED,
		payload: { user }
	};
};

export const setTeam = (user: string, week: number, team: PlayerDTO[]): SetTeam => {
	return {
		type: ActionTypes.SET_TEAM,
		payload: { user, week, team }
	};
};

export type Action = SetUserBeingViewed | SetTeam;
