import { ActionTypes, Action as ActiveTeamAction } from '../Actions/ActiveTeamActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import * as lodash from 'lodash/fp';

type Action = ActiveTeamAction;

export interface State {
  activeTeam: PlayerDTO[];
  weeklyTeamCache: {};
  userBeingViewed: string;

  teamCache: {}
}

const setTeamCache = (path: string, value: PlayerDTO[], state: State) => {
	return lodash.set('teamCache.' + path, value, state);
};

export const initialState: State = {
	activeTeam: [],
	weeklyTeamCache: {} as { weeklyTeam: { id: number; team: PlayerDTO[] } },
	userBeingViewed: '',

	teamCache: {} as { user: { weeks: { id: string; team: PlayerDTO[] } } },
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.ADD_PLAYER: {
		const playerToAdd = action.payload.player;
		return {
			...state,
			activeTeam: state.activeTeam.concat(playerToAdd)
		};
	}

	case ActionTypes.SET_TEAM: {
		const activeTeam = action.payload.activeTeam;
		return {
			...state,
			activeTeam
		};
	}

	case ActionTypes.ADD_TO_WEEKLY_TEAM_CACHE: {
		return {
			...state,
			weeklyTeamCache: {
				...state.weeklyTeamCache,
				[action.payload.weekId]: action.payload.team
			}
		};
	}

	case ActionTypes.REMOVE_INDEX: {
		return {
			...state,
			activeTeam: state.activeTeam.filter((item, index) => action.payload.indexToRemove !== index)
		};
	}

	case ActionTypes.SET_USER_BEING_VIEWED: {
		return {
			...state,
			userBeingViewed: action.payload.user
		};
	}

	case ActionTypes.SET_TEAM_CACHE: {
		console.log('SETTING TEAM CACHE');
		console.log('SETTING TEAM CACHE');
		console.log('SETTING TEAM CACHE');
		return setTeamCache(action.payload.user + '.week-' + action.payload.week, action.payload.team, state);
	}

	default:
		return state;
	}
};
