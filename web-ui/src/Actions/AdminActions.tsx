import { PlayerDTO } from '../Models/Interfaces/Player';
import { CollegeTeam } from '../Models/Interfaces/CollegeTeam';

export enum ActionTypes {
  SET_ADMIN_PAGE_BEING_VIEWED = 'SET_ADMIN_PAGE_BEING_VIEWED',
  SET_TEAM_ADDING_POINTS = 'SET_TEAM_ADDING_POINTS',
  SET_PLAYERS_IN_FILTERED_TEAM = 'SET_PLAYERS_IN_FILTERED_TEAM',
  SET_ALL_COLLEGE_TEAMS = 'SET_ALL_COLLEGE_TEAMS'
}

export interface SetAdminPageBeingViewed {
  type: ActionTypes.SET_ADMIN_PAGE_BEING_VIEWED;
  payload: { adminPageBeingViewed: string };
}

export interface SetTeamAddingPoints {
  type: ActionTypes.SET_TEAM_ADDING_POINTS;
  payload: { team: string };
}

export interface SetPlayersInFilteredTeam {
  type: ActionTypes.SET_PLAYERS_IN_FILTERED_TEAM;
  payload: { players: PlayerDTO[] };
}

export interface SetAllCollegeTeams {
  type: ActionTypes.SET_ALL_COLLEGE_TEAMS;
  payload: { teams: CollegeTeam[] };
}

export const setAdminPageBeingViewed = (adminPageBeingViewed: string): SetAdminPageBeingViewed => {
  return {
    type: ActionTypes.SET_ADMIN_PAGE_BEING_VIEWED,
    payload: { adminPageBeingViewed }
  };
};

export const setTeamAddingPoints = (team: string): SetTeamAddingPoints => {
  return {
    type: ActionTypes.SET_TEAM_ADDING_POINTS,
    payload: { team }
  };
};

export const setPlayersInFilteredTeam = (players: PlayerDTO[]): SetPlayersInFilteredTeam => {
  return {
    type: ActionTypes.SET_PLAYERS_IN_FILTERED_TEAM,
    payload: { players }
  };
};

export const setAllCollegeTeams = (teams: CollegeTeam[]): SetAllCollegeTeams => {
  return {
    type: ActionTypes.SET_ALL_COLLEGE_TEAMS,
    payload: { teams }
  };
};

export type Action =
  | SetAdminPageBeingViewed
  | SetTeamAddingPoints
  | SetPlayersInFilteredTeam
  | SetAllCollegeTeams;
