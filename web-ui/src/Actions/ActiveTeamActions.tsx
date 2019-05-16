import { PlayerDTO } from '../Models/Interfaces/Player';

export enum ActionTypes {
	SET_USER_BEING_VIEWED = 'SET_USER_BEING_VIEWED',
	SET_TEAM = 'SET_TEAM',
	ADD_PLAYER = 'ADD_PLAYER'
}

export interface AddPlayer {
  type: ActionTypes.ADD_PLAYER;
  payload: { user: string, week: number, player: PlayerDTO };
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

export const addPlayer = (user: string, week: number, player: PlayerDTO): AddPlayer => {
	return {
		type: ActionTypes.ADD_PLAYER,
		payload: { user, week, player }
	};
};

export type Action = SetUserBeingViewed | SetTeam | AddPlayer;
