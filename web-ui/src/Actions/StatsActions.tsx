import { WeeklyPlayer } from '../Models/Interfaces/WeeklyPlayer';
import { TopWeeklyUser } from '../Models/Interfaces/TopWeeklyUser';

export enum ActionTypes {
  SET_WEEK_BEING_VIEWED = 'SET_WEEK_BEING_VIEWED',
  ADD_TO_WEEKLY_POINTS_CACHE = 'ADD_TO_WEEKLY_POINTS_CACHE',
  ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE = 'ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE',
  ADD_TO_TOP_WEEKLY_PLAYERS_CACHE = 'ADD_TO_TOP_WEEKLY_PLAYERS_CACHE',
  ADD_TO_TOP_WEEKLY_USERS_CACHE = 'ADD_TO_TOP_WEEKLY_USERS_CACHE'
}

export interface SetWeekBeingViewed {
  type: ActionTypes.SET_WEEK_BEING_VIEWED;
  payload: { week: number };
}

export interface AddToWeeklyPointsCache {
  type: ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE;
  payload: { week_id: number; week: number };
}

export interface AddToAverageWeeklyPointsCache {
  type: ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE;
  payload: { week_id: number; average_weekly_points: number };
}

export interface AddToTopWeeklyPlayersCache {
  type: ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS_CACHE;
  payload: { week_id: number; player: WeeklyPlayer };
}

export interface AddToTopWeeklyUsersCache {
  type: ActionTypes.ADD_TO_TOP_WEEKLY_USERS_CACHE;
  payload: { week_id: number; user: TopWeeklyUser };
}

export const setWeekBeingViewed = (week: number): SetWeekBeingViewed => {
  return {
    type: ActionTypes.SET_WEEK_BEING_VIEWED,
    payload: {
      week
    }
  };
};

export const addToWeeklyPointsCache = (week_id: number, week: number): AddToWeeklyPointsCache => {
  return {
    type: ActionTypes.ADD_TO_WEEKLY_POINTS_CACHE,
    payload: { week_id, week }
  };
};

export const addToTopWeeklyPlayersCache = (
  week_id: number,
  player: WeeklyPlayer
): AddToTopWeeklyPlayersCache => {
  return {
    type: ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS_CACHE,
    payload: { week_id, player }
  };
};

export const addToAverageWeeklyPointsCache = (
  week_id: number,
  average_weekly_points: number
): AddToAverageWeeklyPointsCache => {
  return {
    type: ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS_CACHE,
    payload: { week_id, average_weekly_points }
  };
};

export const addToTopWeeklyUsersCache = (
  week_id: number,
  user: TopWeeklyUser
): AddToTopWeeklyUsersCache => {
  return {
    type: ActionTypes.ADD_TO_TOP_WEEKLY_USERS_CACHE,
    payload: { week_id, user }
  };
};

export type Action =
  | SetWeekBeingViewed
  | AddToWeeklyPointsCache
  | AddToAverageWeeklyPointsCache
  | AddToTopWeeklyPlayersCache
  | AddToTopWeeklyUsersCache;
