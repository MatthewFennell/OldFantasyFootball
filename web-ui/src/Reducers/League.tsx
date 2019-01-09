import { ActionTypes, Action as StatsAction } from '../Actions/LeagueActions';
type Action = StatsAction;

// Define our State interface for the current reducer
export interface State {
  leagueCache: {};
}

// Define our initialState
export const initialState: State = {
  leagueCache: {} as { leagueCache: { leagueName: string; position: number } }
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_LEAGUE_CACHE: {
      return {
        ...state,
        leagueCache: {
          ...state.leagueCache,
          [action.payload.leagueName]: action.payload.position
        }
      };
    }

    default:
      return state;
  }
};
