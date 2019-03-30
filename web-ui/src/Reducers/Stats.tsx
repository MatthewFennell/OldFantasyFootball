import { ActionTypes, Action as StatsAction } from '../Actions/StatsActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import { TopWeeklyUser } from '../Models/Interfaces/TopWeeklyUser';
import { MostValuable } from '../Models/Interfaces/MostValuable';
import * as lodash from 'lodash/fp';

type Action = StatsAction;

// Define our State interface for the current reducer
export interface State {
  weekBeingViewed: number;
  averageWeeklyPointsCache: {};
  topWeeklyPlayersCache: {};
  topWeeklyUsersCache: {};
  totalNumberOfWeeks: 0;
  mostValuable: MostValuable;

  budget: {}
  totalPointsCache: {}
  weeklyPoints: {}

}

// Define our initialState
export const initialState: State = {
	weekBeingViewed: 0,
	averageWeeklyPointsCache: {} as { averageWeeks: { id: number; points: number } },
	topWeeklyPlayersCache: {} as { topPlayers: { id: number; player: PlayerDTO } },
	topWeeklyUsersCache: {} as { topUsers: { id: number; user: TopWeeklyUser } },
	totalNumberOfWeeks: 0,
	mostValuable: undefined as any,

	budget: {} as { user: { id: string; budget: number } },
	totalPointsCache: {} as { user: { id: string; points: number } },
	weeklyPoints: {} as { user: { weeks: { id: string; points: number } } },
};

const setBudget = (path: string, value: number, state: State) => {
	return lodash.set('budget.' + path, value, state);
};

const setTotalPoints = (path: string, value: number, state: State) => {
	return lodash.set('totalPointsCache.' + path, value, state);
};

const setWeeklyPoints = (path: string, value: number, state: State) => {
	return lodash.set('weeklyPoints.' + path, value, state);
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_WEEK_BEING_VIEWED: {
		return {
			...state,
			weekBeingViewed: action.payload.week
		};
	}

	case ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE: {
		return {
			...state,
			averageWeeklyPointsCache: {
				...state.averageWeeklyPointsCache,
				[action.payload.weekId]: action.payload.averageWeeklyPoints
			}
		};
	}

	case ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS_CACHE: {
		return {
			...state,
			topWeeklyPlayersCache: {
				...state.topWeeklyPlayersCache,
				[action.payload.weekId]: action.payload.player
			}
		};
	}

	case ActionTypes.ADD_TO_TOP_WEEKLY_USERS_CACHE: {
		return {
			...state,
			topWeeklyUsersCache: {
				...state.topWeeklyUsersCache,
				[action.payload.weekId]: action.payload.user
			}
		};
	}

	case ActionTypes.SET_TOTAL_NUMBER_OF_WEEKS: {
		return {
			...state,
			totalNumberOfWeeks: action.payload.numberOfWeeks
		};
	}

	case ActionTypes.SET_MOST_VALUBLE: {
		return {
			...state,
			mostValuable: action.payload.mostValuable
		};
	}

	case ActionTypes.SET_BUDGET: {
		return setBudget(action.payload.user, action.payload.budget, state);
	}

	case ActionTypes.SET_TOTAL_POINTS_CACHE: {
		return setTotalPoints(action.payload.user, action.payload.points, state);
	}

	case ActionTypes.SET_WEEKLY_POINTS_CACHE: {
		return setWeeklyPoints(action.payload.user + '.week-' + action.payload.week, action.payload.points, state);
	}

	default:
		return state;
	}
};
