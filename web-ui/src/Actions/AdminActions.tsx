import { PlayerDTO } from '../Models/Interfaces/Player';
import { CollegeTeam } from '../Models/Interfaces/CollegeTeam';

export enum ActionTypes {
  SET_ADMIN_PAGE_BEING_VIEWED = 'SET_ADMIN_PAGE_BEING_VIEWED',
  SET_CAPTAIN_PAGE_BEING_VIEWED = 'SET_CAPTAIN_PAGE_BEING_VIEWED',
  SET_TEAM_ADDING_POINTS = 'SET_TEAM_ADDING_POINTS',
  SET_PLAYERS_IN_FILTERED_TEAM = 'SET_PLAYERS_IN_FILTERED_TEAM',
  SET_ALL_COLLEGE_TEAMS = 'SET_ALL_COLLEGE_TEAMS',
  ADD_COLLEGE_TEAM = 'ADD_COLLEGE_TEAM',
  REMOVE_COLLEGE_TEAM = 'REMOVE_COLLEGE_TEAM'
}

export interface SetCaptainPageBeingViewed {
  type: ActionTypes.SET_CAPTAIN_PAGE_BEING_VIEWED;
  payload: { captainPageBeingViewed: string };
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

export interface AddCollegeTeam {
  type: ActionTypes.ADD_COLLEGE_TEAM;
  payload: { team: CollegeTeam };
}

export interface RemoveCollegeTeam {
  type: ActionTypes.REMOVE_COLLEGE_TEAM;
  payload: { teamName: String };
}

export const setCaptainPageBeingViewed = (captainPageBeingViewed: string): SetCaptainPageBeingViewed => {
	return {
		type: ActionTypes.SET_CAPTAIN_PAGE_BEING_VIEWED,
		payload: { captainPageBeingViewed }
	};
};

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

export const addCollegeTeam = (team: CollegeTeam): AddCollegeTeam => {
	return {
		type: ActionTypes.ADD_COLLEGE_TEAM,
		payload: { team }
	};
};

export const removeCollegeTeam = (teamName: string): RemoveCollegeTeam => {
	return {
		type: ActionTypes.REMOVE_COLLEGE_TEAM,
		payload: { teamName }
	};
};

export type Action =
  | SetAdminPageBeingViewed
  | SetTeamAddingPoints
  | SetPlayersInFilteredTeam
  | SetAllCollegeTeams
  | AddCollegeTeam
  | RemoveCollegeTeam
  | SetCaptainPageBeingViewed;
