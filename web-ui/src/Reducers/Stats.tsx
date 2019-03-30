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

  budget: {}
  totalPointsCache: {}
  weeklyPoints: {}
  mostValuableCache: {}
}

// Define our initialState
export const initialState: State = {
	weekBeingViewed: 0,
	averageWeeklyPointsCache: {} as { averageWeeks: { id: number; points: number } },
	topWeeklyPlayersCache: {} as { topPlayers: { id: number; player: PlayerDTO } },
	topWeeklyUsersCache: {} as { topUsers: { id: number; user: TopWeeklyUser } },
	totalNumberOfWeeks: 0,

	budget: {} as { user: { id: string; budget: number } },
	totalPointsCache: {} as { user: { id: string; points: number } },
	weeklyPoints: {} as { user: { weeks: { id: string; points: number } } },
	mostValuableCache: {} as { user: { id: string; mostValuable: MostValuable } },
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_WEEK_BEING_VIEWED: {
		return lodash.set('weekBeingViewed', action.payload.week, state);
	}

	case ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE: {
		const { weekId, averageWeeklyPoints } = action.payload;
		return lodash.set('averageWeeklyPointsCache.' + weekId.toString(), averageWeeklyPoints, state);
	}

	case ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS_CACHE: {
		const { weekId, player } = action.payload;
		return lodash.set('topWeeklyPlayersCache.' + weekId.toString(), player, state);
	}

	case ActionTypes.ADD_TO_TOP_WEEKLY_USERS_CACHE: {
		const { weekId, user } = action.payload;
		return lodash.set('topWeeklyUsersCache.' + weekId.toString(), user, state);
	}

	case ActionTypes.SET_TOTAL_NUMBER_OF_WEEKS: {
		return lodash.set('totalNumberOfWeeks', action.payload.numberOfWeeks, state);
	}

	case ActionTypes.SET_BUDGET: {
		return lodash.set('budget.' + action.payload.user, action.payload.budget, state);
	}

	case ActionTypes.SET_TOTAL_POINTS_CACHE: {
		return lodash.set('totalPointsCache.' + action.payload.user, action.payload.points, state);
	}

	case ActionTypes.SET_WEEKLY_POINTS_CACHE: {
		const { user, week, points } = action.payload;
		return lodash.set('weeklyPoints.' + user + '.' + week, points, state);
	}

	case ActionTypes.SET_MOST_VALUABLE_CACHE: {
		return lodash.set('mostValuableCache.' + action.payload.user, action.payload.mostValuable, state);
	}

	default:
		return state;
	}
};
