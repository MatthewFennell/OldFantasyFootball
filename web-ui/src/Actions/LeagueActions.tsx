export enum ActionTypes {
  ADD_TO_LEAGUE_CACHE = 'ADD_TO_LEAGUE_CACHE'
}

export interface AddToLeagueCache {
  type: ActionTypes.ADD_TO_LEAGUE_CACHE;
  payload: { leagueName: string; position: number };
}

export const addToLeagueCache = (leagueName: string, position: number): AddToLeagueCache => {
  return {
    type: ActionTypes.ADD_TO_LEAGUE_CACHE,
    payload: { leagueName, position }
  };
};

export type Action = AddToLeagueCache;
