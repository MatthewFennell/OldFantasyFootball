import { TopWeeklyPlayer } from '../Models/Interfaces/TopWeeklyPlayer';
import { TopWeeklyUser } from '../Models/Interfaces/TopWeeklyUser';

export enum ActionTypes {
  SET_WEEK_BEING_VIEWED = 'SET_WEEK_BEING_VIEWED',
  ADD_TO_WEEKLY_POINTS_CACHE = 'ADD_TO_WEEKLY_POINTS_CACHE',
  ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE = 'ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE',
  ADD_TO_TOP_WEEKLY_PLAYERS_CACHE = 'ADD_TO_TOP_WEEKLY_PLAYERS_CACHE',
  ADD_TO_TOP_WEEKLY_USERS_CACHE = 'ADD_TO_TOP_WEEKLY_USERS_CACHE',
  SET_TOTAL_NUMBER_OF_WEEKS = 'SET_TOTAL_NUMBER_OF_WEEK;'
}

export interface SetWeekBeingViewed {
  type: ActionTypes.SET_WEEK_BEING_VIEWED;
  payload: { week: number };
}

export interface AddToWeeklyPointsCache {
  type: ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE;
  payload: { weekId: number; week: number };
}

export interface AddToAverageWeeklyPointsCache {
  type: ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE;
  payload: { weekId: number; averageWeeklyPoints: number };
}

export interface AddToTopWeeklyPlayersCache {
  type: ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS_CACHE;
  payload: { weekId: number; player: TopWeeklyPlayer };
}

export interface AddToTopWeeklyUsersCache {
  type: ActionTypes.ADD_TO_TOP_WEEKLY_USERS_CACHE;
  payload: { weekId: number; user: TopWeeklyUser };
}

export interface SetTotalNumberOfWeeks {
  type: ActionTypes.SET_TOTAL_NUMBER_OF_WEEKS;
  payload: { numberOfWeeks: number };
}

export const setWeekBeingViewed = (week: number): SetWeekBeingViewed => {
  return {
    type: ActionTypes.SET_WEEK_BEING_VIEWED,
    payload: {
      week
    }
  };
};

export const addToWeeklyPointsCache = (weekId: number, week: number): AddToWeeklyPointsCache => {
  return {
    type: ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE,
    payload: { weekId, week }
  };
};

export const addToTopWeeklyPlayersCache = (
  weekId: number,
  player: TopWeeklyPlayer
): AddToTopWeeklyPlayersCache => {
  return {
    type: ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS_CACHE,
    payload: { weekId, player }
  };
};

export const addToAverageWeeklyPointsCache = (
  weekId: number,
  averageWeeklyPoints: number
): AddToAverageWeeklyPointsCache => {
  return {
    type: ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE,
    payload: { weekId, averageWeeklyPoints }
  };
};

export const addToTopWeeklyUsersCache = (
  weekId: number,
  user: TopWeeklyUser
): AddToTopWeeklyUsersCache => {
  return {
    type: ActionTypes.ADD_TO_TOP_WEEKLY_USERS_CACHE,
    payload: { weekId, user }
  };
};

export const setTotalNumberOfWeeks = (numberOfWeeks: number): SetTotalNumberOfWeeks => {
  return {
    type: ActionTypes.SET_TOTAL_NUMBER_OF_WEEKS,
    payload: { numberOfWeeks }
  };
};

export type Action =
  | SetWeekBeingViewed
  | AddToWeeklyPointsCache
  | AddToAverageWeeklyPointsCache
  | AddToTopWeeklyPlayersCache
  | AddToTopWeeklyUsersCache
  | SetTotalNumberOfWeeks;