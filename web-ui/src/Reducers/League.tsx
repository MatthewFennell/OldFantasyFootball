import { ActionTypes, Action as StatsAction } from '../Actions/LeagueActions';
type Action = StatsAction;

// Define our State interface for the current reducer
export interface State {
  leagueCache: {};
  leaguePageBeingViewed: string;
}

// Define our initialState
export const initialState: State = {
  leagueCache: {} as { leagueCache: { leagueName: string; position: number } },
  leaguePageBeingViewed: 'home'
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

    case ActionTypes.SET_LEAGUE_PAGE_BEING_VIEWED: {
      return {
        ...state,
        leaguePageBeingViewed: action.payload.leaguePageBeingViewed
      };
    }

    default:
      return state;
  }
};
