import { ActionTypes, Action as StatsAction } from '../Actions/StatsActions';
type Action = StatsAction;

// Define our State interface for the current reducer
export interface State {
  averagePoints: number;
  weekBeingViewed: number;
  pointsInActiveWeek: number;
  weeklyPointsCache: {};
}

// Define our initialState
export const initialState: State = {
  averagePoints: 0,
  weekBeingViewed: 0,
  pointsInActiveWeek: 0,
  weeklyPointsCache: {} as { weeks: { id: number; points: number } }
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_AVERAGE_POINTS: {
      const averagePoints = action.payload.averagePoints;
      return {
        ...state,
        averagePoints
      };
    }

    case ActionTypes.SET_WEEK_BEING_VIEWED: {
      return {
        ...state,
        weekBeingViewed: action.payload.week
      };
    }

    case ActionTypes.SET_POINTS_IN_ACTIVE_WEEK: {
      return {
        ...state,
        pointsInActiveWeek: action.payload.weekPoints
      };
    }

    case ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE: {
      return {
        ...state,
        weeklyPointsCache: {
          ...state.weeklyPointsCache,
          [action.payload.id]: action.payload.week
        }
      };
    }

    default:
      return state;
  }
};
