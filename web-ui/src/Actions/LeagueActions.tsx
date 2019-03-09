import { UserLeaguePosition } from '../Models/Interfaces/UserLeaguePosition';

export enum ActionTypes {
  ADD_TO_LEAGUE_CACHE = 'ADD_TO_LEAGUE_CACHE',
  SET_LEAGUE_PAGE_BEING_VIEWED = 'SET_LEAGUE_PAGE_BEING_VIEWED',
  SET_LEAGUE_RANKINGS = 'SET_LEAGUE_RANKINGS',
  ADD_TO_LEAGUE_RANKINGS = 'ADD_TO_LEAGUE_RANKINGS'
}

export interface AddToLeagueCache {
  type: ActionTypes.ADD_TO_LEAGUE_CACHE;
  payload: { leagueName: string; position: number };
}

export interface SetLeaguePageBeingViewed {
  type: ActionTypes.SET_LEAGUE_PAGE_BEING_VIEWED;
  payload: { leaguePageBeingViewed: string };
}

export interface SetLeagueRankings {
  type: ActionTypes.SET_LEAGUE_RANKINGS;
  payload: { leagueRankings: UserLeaguePosition[] };
}

export interface AddToLeagueRankings {
  type: ActionTypes.ADD_TO_LEAGUE_RANKINGS;
  payload: { user: UserLeaguePosition };
}

export const addToLeagueCache = (leagueName: string, position: number): AddToLeagueCache => {
	return {
		type: ActionTypes.ADD_TO_LEAGUE_CACHE,
		payload: { leagueName, position }
	};
};

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

export type Action =
  | AddToLeagueCache
  | SetLeaguePageBeingViewed
  | SetLeagueRankings
  | AddToLeagueRankings;
