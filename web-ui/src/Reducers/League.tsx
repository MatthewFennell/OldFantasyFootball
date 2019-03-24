import { ActionTypes, Action as LeagueAction } from '../Actions/LeagueActions';
import { UserLeaguePosition } from '../Models/Interfaces/UserLeaguePosition';
type Action = LeagueAction;

// Define our State interface for the current reducer
export interface State {
  leagueCache: {};
  leaguePageBeingViewed: string;
  leagueRankings: UserLeaguePosition[];
  isAdmin: boolean;
  code: string;
}

// Define our initialState
export const initialState: State = {
	leagueCache: {} as { leagueCache: { leagueName: string; position: number } },
	leaguePageBeingViewed: 'home',
	leagueRankings: [],
	isAdmin: false,
	code: ''
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

	case ActionTypes.SET_LEAGUE_RANKINGS: {
		return {
			...state,
			leagueRankings: action.payload.leagueRankings
		};
	}

	case ActionTypes.ADD_TO_LEAGUE_RANKINGS: {
		return {
			...state,
			leagueRankings: state.leagueRankings.concat(action.payload.user)
		};
	}

	case ActionTypes.SET_IS_LEAGUE_ADMIN: {
		return {
			...state,
			isAdmin: action.payload.admin
		};
	}

	case ActionTypes.SET_LEAGUE_CODE: {
		return {
			...state,
			code: action.payload.code
		};
	}

	default:
		return state;
	}
};
