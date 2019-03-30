import { ActionTypes, Action as ActiveTeamAction } from '../Actions/ActiveTeamActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import * as lodash from 'lodash/fp';

type Action = ActiveTeamAction;

export interface State {
  userBeingViewed: string;
  teamCache: {}
}

const setTeamCache = (path: string, value: PlayerDTO[], state: State) => {
	return lodash.set('teamCache.' + path, value, state);
};

export const initialState: State = {
	userBeingViewed: '',
	teamCache: {} as { user: { weeks: { id: string; team: PlayerDTO[] } } },
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_USER_BEING_VIEWED: {
		return {
			...state,
			userBeingViewed: action.payload.user
		};
	}

	case ActionTypes.SET_TEAM_CACHE: {
		return setTeamCache(action.payload.user + '.week-' + action.payload.week, action.payload.team, state);
	}

	default:
		return state;
	}
};
