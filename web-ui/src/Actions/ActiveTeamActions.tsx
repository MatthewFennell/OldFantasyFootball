import { WeeklyPlayer } from '../Models/Interfaces/WeeklyPlayer';

export enum ActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  SET_TEAM = 'SET_TEAM',
  ADD_TO_WEEKLY_TEAM_CACHE = 'ADD_TO_WEEKLY_TEAM_CACHE'
}

export interface AddPlayer {
  type: ActionTypes.ADD_PLAYER;
  payload: { player: WeeklyPlayer };
}

export interface SetTeam {
  type: ActionTypes.SET_TEAM;
  payload: { activeTeam: WeeklyPlayer[] };
}

export interface AddToWeeklyTeamCache {
  type: ActionTypes.ADD_TO_WEEKLY_TEAM_CACHE;
  payload: { weekId: number; team: WeeklyPlayer[] };
}

export const addPlayer = (player: WeeklyPlayer): AddPlayer => {
  return {
    type: ActionTypes.ADD_PLAYER,
    payload: {
      player
    }
  };
};

export const setTeam = (activeTeam: WeeklyPlayer[]): SetTeam => {
  return {
    type: ActionTypes.SET_TEAM,
    payload: {
      activeTeam
    }
  };
};

export const addToWeeklyTeamCache = (
  weekId: number,
  team: WeeklyPlayer[]
): AddToWeeklyTeamCache => {
  return {
    type: ActionTypes.ADD_TO_WEEKLY_TEAM_CACHE,
    payload: { weekId, team }
  };
};

export type Action = AddPlayer | SetTeam | AddToWeeklyTeamCache;
