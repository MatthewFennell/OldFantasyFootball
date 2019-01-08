import { WeeklyPlayer } from '../Models/Interfaces/WeeklyPlayer';

export enum ActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  SET_TEAM = 'SET_TEAM'
}

export interface AddPlayer {
  type: ActionTypes.ADD_PLAYER;
  payload: { player: WeeklyPlayer };
}

export interface SetTeam {
  type: ActionTypes.SET_TEAM;
  payload: { activeTeam: WeeklyPlayer[] };
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

export type Action = AddPlayer | SetTeam;
