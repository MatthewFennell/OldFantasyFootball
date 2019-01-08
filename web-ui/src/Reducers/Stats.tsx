import { ActionTypes, Action as StatsAction } from '../Actions/StatsActions';
import { WeeklyPlayer } from '../Models/Interfaces/WeeklyPlayer';
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
  averageWeeklyPointsCache: {} as { average_weeks: { id: number; points: number } },
  topWeeklyPlayersCache: {} as { top_players: { id: number; player: WeeklyPlayer } },
  topWeeklyUsersCache: {} as { top_users: { id: number; user: TopWeeklyUser } }
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
          [action.payload.week_id]: action.payload.week
        }
      };
    }

    case ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE: {
      return {
        ...state,
        averageWeeklyPointsCache: {
          ...state.averageWeeklyPointsCache,
          [action.payload.week_id]: action.payload.average_weekly_points
        }
      };
    }

    case ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS_CACHE: {
      return {
        ...state,
        topWeeklyPlayersCache: {
          ...state.topWeeklyPlayersCache,
          [action.payload.week_id]: action.payload.player
        }
      };
    }

    case ActionTypes.ADD_TO_TOP_WEEKLY_USERS_CACHE: {
      return {
        ...state,
        topWeeklyUsersCache: {
          ...state.topWeeklyUsersCache,
          [action.payload.week_id]: action.payload.user
        }
      };
    }

    default:
      return state;
  }
};
