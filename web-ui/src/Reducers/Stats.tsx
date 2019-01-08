import { ActionTypes, Action as StatsAction } from '../Actions/StatsActions';
import { TopWeeklyPlayer } from '../Models/Interfaces/TopWeeklyPlayer';
import { TopWeeklyUser } from '../Models/Interfaces/TopWeeklyUser';
type Action = StatsAction;

// Define our State interface for the current reducer
export interface State {
  weekBeingViewed: number;
  weeklyPointsCache: {};
  averageWeeklyPointsCache: {};
  topWeeklyPlayersCache: {};
  topWeeklyUsersCache: {};
}

// Define our initialState
export const initialState: State = {
  weekBeingViewed: 0,
  weeklyPointsCache: {} as { weeks: { id: number; points: number } },
  averageWeeklyPointsCache: {} as { averageWeeks: { id: number; points: number } },
  topWeeklyPlayersCache: {} as { topPlayers: { id: number; player: TopWeeklyPlayer } },
  topWeeklyUsersCache: {} as { topUsers: { id: number; user: TopWeeklyUser } }
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_WEEK_BEING_VIEWED: {
      return {
        ...state,
        weekBeingViewed: action.payload.week
      };
    }

    case ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE: {
      return {
        ...state,
        weeklyPointsCache: {
          ...state.weeklyPointsCache,
          [action.payload.weekId]: action.payload.week
        }
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

    default:
      return state;
  }
};
