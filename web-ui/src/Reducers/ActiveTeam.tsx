import { ActionTypes, Action as ActiveTeamAction } from '../Actions/ActiveTeamActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import * as lodash from 'lodash/fp';

type Action = ActiveTeamAction;

export interface State {
  userBeingViewed: string;
  team: {}
}

export const initialState: State = {
	userBeingViewed: '',
	team: {} as { user: { weeks: { id: string; team: PlayerDTO[] } } },
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_USER_BEING_VIEWED: {
		return lodash.set('userBeingViewed', action.payload.user, state);
	}

	case ActionTypes.SET_TEAM: {
		const { user, week, team } = action.payload;
		return lodash.set('team.' + user + '.' + 'week-' + week, team, state);
	}

	default:
		return state;
	}
};
