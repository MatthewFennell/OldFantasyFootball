export enum ActionTypes {
  SET_AVERAGE_POINTS = 'SET_AVERAGE_POINTS',
  SET_WEEK_BEING_VIEWED = 'SET_WEEK_BEING_VIEWED',
  SET_POINTS_IN_ACTIVE_WEEK = 'SET_POINTS_IN_ACTIVE_WEEK',
  ADD_TO_WEEKLY_POINTS_CACHE = 'ADD_TO_WEEKLY_POINTS_CACHE'
}

export interface SetAveragePoints {
  type: ActionTypes.SET_AVERAGE_POINTS;
  payload: { averagePoints: number };
}

export interface SetWeekBeingViewed {
  type: ActionTypes.SET_WEEK_BEING_VIEWED;
  payload: { week: number };
}

export interface SetPointsInActiveWeek {
  type: ActionTypes.SET_POINTS_IN_ACTIVE_WEEK;
  payload: { weekPoints: number };
}

export interface AddToWeeklyPointsCache {
  type: ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE;
  payload: { id: number; week: number };
}

export const setAveragePoints = (averagePoints: number): SetAveragePoints => {
  return {
    type: ActionTypes.SET_AVERAGE_POINTS,
    payload: {
      averagePoints
    }
  };
};

export const setWeekBeingViewed = (week: number): SetWeekBeingViewed => {
  return {
    type: ActionTypes.SET_WEEK_BEING_VIEWED,
    payload: {
      week
    }
  };
};

export const setPointsInActiveWeek = (weekPoints: number): SetPointsInActiveWeek => {
  return {
    type: ActionTypes.SET_POINTS_IN_ACTIVE_WEEK,
    payload: {
      weekPoints
    }
  };
};

export const addToWeeklyPointsCache = (id: number, week: number): AddToWeeklyPointsCache => {
  return {
    type: ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE,
    payload: { id, week }
  };
};

export type Action =
  | SetAveragePoints
  | SetWeekBeingViewed
  | SetPointsInActiveWeek
  | AddToWeeklyPointsCache;
