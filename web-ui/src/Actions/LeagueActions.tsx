import { UserLeaguePosition } from '../Models/Interfaces/UserLeaguePosition';

export enum ActionTypes {
  SET_LEAGUE_PAGE_BEING_VIEWED = 'SET_LEAGUE_PAGE_BEING_VIEWED',
  SET_LEAGUE_RANKINGS = 'SET_LEAGUE_RANKINGS',
	ADD_TO_LEAGUE_RANKINGS = 'ADD_TO_LEAGUE_RANKINGS',
	SET_IS_LEAGUE_ADMIN = 'SET_IS_LEAGUE_ADMIN',
	SET_LEAGUE_CODE = 'SET_LEAGUE_CODE',
	SET_LEAGUES = 'SET_LEAGUES'
}

export interface SetLeaguePageBeingViewed {
  type: ActionTypes.SET_LEAGUE_PAGE_BEING_VIEWED;
  payload: { leaguePageBeingViewed: string };
}

export interface SetLeagueRankings {
  type: ActionTypes.SET_LEAGUE_RANKINGS;
  payload: { leagueRankings: UserLeaguePosition[] };
}

export interface SetIsLeagueAdmin {
  type: ActionTypes.SET_IS_LEAGUE_ADMIN;
  payload: { admin: boolean };
}

export interface AddToLeagueRankings {
  type: ActionTypes.ADD_TO_LEAGUE_RANKINGS;
  payload: { user: UserLeaguePosition };
}

export interface SetLeagueCode {
  type: ActionTypes.SET_LEAGUE_CODE;
  payload: { code: string };
}

export interface SetLeagues {
  type: ActionTypes.SET_LEAGUES;
  payload: { user: string, leagueName: string; position: number };
}

export const setLeaguePageBeingViewed = (
	leaguePageBeingViewed: string
): SetLeaguePageBeingViewed => {
	return {
		type: ActionTypes.SET_LEAGUE_PAGE_BEING_VIEWED,
		payload: { leaguePageBeingViewed }
	};
};

export const setLeagueRankings = (leagueRankings: UserLeaguePosition[]): SetLeagueRankings => {
	return {
		type: ActionTypes.SET_LEAGUE_RANKINGS,
		payload: { leagueRankings }
	};
};

export const addToLeagueRankings = (user: UserLeaguePosition): AddToLeagueRankings => {
	return {
		type: ActionTypes.ADD_TO_LEAGUE_RANKINGS,
		payload: { user }
	};
};

export const setIsLeagueAdmin = (admin: boolean): SetIsLeagueAdmin => {
	return {
		type: ActionTypes.SET_IS_LEAGUE_ADMIN,
		payload: { admin }
	};
};

export const setLeagueCode = (code: string): SetLeagueCode => {
	return {
		type: ActionTypes.SET_LEAGUE_CODE,
		payload: { code }
	};
};

export const setLeagues = (user: string, leagueName: string, position: number): SetLeagues => {
	return {
		type: ActionTypes.SET_LEAGUES,
		payload: { user, leagueName, position }
	};
};

export type Action =
  | SetLeaguePageBeingViewed
  | SetLeagueRankings
	| AddToLeagueRankings
	| SetIsLeagueAdmin
	| SetLeagueCode
	| SetLeagues;
