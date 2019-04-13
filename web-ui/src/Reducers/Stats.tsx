import { ActionTypes, Action as StatsAction } from '../Actions/StatsActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import { TopWeeklyUser } from '../Models/Interfaces/TopWeeklyUser';
import { MostValuable } from '../Models/Interfaces/MostValuable';
import { TeamHistory } from '../Models/Interfaces/TeamHistory';
import * as lodash from 'lodash/fp';

type Action = StatsAction;

// Define our State interface for the current reducer
export interface State {
  weekBeingViewed: number;
  averageWeeklyPoints: {};
  topWeeklyPlayers: {};
  topWeeklyUsers: {};
  totalNumberOfWeeks: 0;

  budget: {}
  totalPoints: {}
  weeklyPoints: {}
  mostValuable: {}

  history: TeamHistory[]
}

// Define our initialState
export const initialState: State = {
	weekBeingViewed: 0,
	averageWeeklyPoints: {} as { averageWeeks: { id: number; points: number } },
	topWeeklyPlayers: {} as { topPlayers: { id: number; player: PlayerDTO } },
	topWeeklyUsers: {} as { topUsers: { id: number; user: TopWeeklyUser } },
	totalNumberOfWeeks: 0,

	budget: {} as { user: { id: string; budget: number } },
	totalPoints: {} as { user: { id: string; points: number } },
	weeklyPoints: {} as { user: { weeks: { id: string; points: number } } },
	mostValuable: {} as { user: { id: string; mostValuable: MostValuable } },

	history: []
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_WEEK_BEING_VIEWED: {
		return lodash.set('weekBeingViewed', action.payload.week, state);
	}

	case ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS: {
		const { weekId, averageWeeklyPoints } = action.payload;
		return lodash.set('averageWeeklyPoints.' + weekId.toString(), averageWeeklyPoints, state);
	}

	case ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS: {
		const { weekId, player } = action.payload;
		return lodash.set('topWeeklyPlayers.' + weekId.toString(), player, state);
	}

	case ActionTypes.ADD_TO_TOP_WEEKLY_USERS: {
		const { weekId, user } = action.payload;
		return lodash.set('topWeeklyUsers.' + weekId.toString(), user, state);
	}

	case ActionTypes.SET_TOTAL_NUMBER_OF_WEEKS: {
		return lodash.set('totalNumberOfWeeks', action.payload.numberOfWeeks, state);
	}

	case ActionTypes.SET_BUDGET: {
		return lodash.set('budget.' + action.payload.user, action.payload.budget, state);
	}

	case ActionTypes.SET_TOTAL_POINTS: {
		return lodash.set('totalPoints.' + action.payload.user, action.payload.points, state);
	}

	case ActionTypes.SET_WEEKLY_POINTS: {
		const { user, week, points } = action.payload;
		return lodash.set('weeklyPoints.' + user + '.' + week, points, state);
	}

	case ActionTypes.SET_MOST_VALUABLE: {
		return lodash.set('mostValuable.' + action.payload.user, action.payload.mostValuable, state);
	}

	case ActionTypes.SET_STATS_HISTORY: {
		return lodash.set('history.' + action.payload.week, action.payload.statsHistory, state);
	}

	default:
		return state;
	}
};
