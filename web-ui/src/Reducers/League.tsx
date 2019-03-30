import { ActionTypes, Action as LeagueAction } from '../Actions/LeagueActions';
import { UserLeaguePosition } from '../Models/Interfaces/UserLeaguePosition';
import * as lodash from 'lodash/fp';
type Action = LeagueAction;

// Define our State interface for the current reducer
export interface State {
  leagueCache: {};
  leaguePageBeingViewed: string;
  leagueRankings: UserLeaguePosition[];
  isAdmin: boolean;
  code: string;
  leagues: {}
}

// Define our initialState
export const initialState: State = {
	leagueCache: {} as { leagueCache: { leagueName: string; position: number } },
	leaguePageBeingViewed: 'home',
	leagueRankings: [],
	isAdmin: false,
	code: '',
	leagues: {} as { user: { leagueCache: { leagueName: string; position: number } } },
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_LEAGUE_PAGE_BEING_VIEWED: {
		return lodash.set('leaguePageBeingViewed', action.payload.leaguePageBeingViewed, state);
	}

	case ActionTypes.SET_LEAGUE_RANKINGS: {
		return lodash.set('leagueRankings', action.payload.leagueRankings, state);
	}

	case ActionTypes.ADD_TO_LEAGUE_RANKINGS: {
		return {
			...state,
			leagueRankings: state.leagueRankings.concat(action.payload.user)
		};
	}

	case ActionTypes.SET_IS_LEAGUE_ADMIN: {
		return lodash.set('isAdmin', action.payload.admin, state);
	}

	case ActionTypes.SET_LEAGUE_CODE: {
		return lodash.set('code', action.payload.code, state);
	}

	case ActionTypes.SET_LEAGUES: {
		return lodash.set('leagues.' + action.payload.user + '.' + action.payload.leagueName, action.payload.position, state);
	}

	default:
		return state;
	}
};
