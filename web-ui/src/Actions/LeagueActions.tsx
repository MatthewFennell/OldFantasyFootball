export enum ActionTypes {
  ADD_TO_LEAGUE_CACHE = 'ADD_TO_LEAGUE_CACHE',
  SET_LEAGUE_PAGE_BEING_VIEWED = 'SET_LEAGUE_PAGE_BEING_VIEWED'
}

export interface AddToLeagueCache {
  type: ActionTypes.ADD_TO_LEAGUE_CACHE;
  payload: { leagueName: string; position: number };
}

export interface SetLeaguePageBeingViewed {
  type: ActionTypes.SET_LEAGUE_PAGE_BEING_VIEWED;
  payload: { leaguePageBeingViewed: string };
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

export type Action = AddToLeagueCache | SetLeaguePageBeingViewed;
