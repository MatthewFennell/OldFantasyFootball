import { ActionTypes, Action as ActiveTeamAction } from '../Actions/ActiveTeamActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import * as lodash from 'lodash/fp';

type Action = ActiveTeamAction;

export interface State {
  userBeingViewed: string;
  teamCache: {}
}

export const initialState: State = {
	userBeingViewed: '',
	teamCache: {} as { user: { weeks: { id: string; team: PlayerDTO[] } } },
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_USER_BEING_VIEWED: {
		return lodash.set('userBeingViewed', action.payload.user, state);
	}

	case ActionTypes.SET_TEAM_CACHE: {
		const { user, week, team } = action.payload;
		return lodash.set('teamCache.' + user + '.' + week, team, state);
	}

	default:
		return state;
	}
};
