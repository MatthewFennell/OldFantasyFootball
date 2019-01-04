import { Player } from '../Models/Interfaces/Player';

export enum ActionTypes {
  ADD_PLAYER = 'ADD_PLAYER',
  SET_TEAM = 'SET_TEAM'
}

export interface AddPlayer {
  type: ActionTypes.ADD_PLAYER;
  payload: { player: Player };
}

export interface SetTeam {
  type: ActionTypes.SET_TEAM;
  payload: { activeTeam: Player[] };
}

export const addPlayer = (player: Player): AddPlayer => {
  return {
    type: ActionTypes.ADD_PLAYER,
    payload: {
      player
    }
  };
};

export const setTeam = (activeTeam: Player[]): SetTeam => {
  return {
    type: ActionTypes.SET_TEAM,
    payload: {
      activeTeam
    }
  };
};

export type Action = AddPlayer | SetTeam;
