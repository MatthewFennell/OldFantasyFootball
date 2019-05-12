import { PlayerDTO } from '../Models/Interfaces/Player';
import { TopWeeklyUser } from '../Models/Interfaces/TopWeeklyUser';
import { MostValuable } from '../Models/Interfaces/MostValuable';
import { TeamHistory } from '../Models/Interfaces/TeamHistory';
import { Rules } from '../Models/Interfaces/Rules';

export enum ActionTypes {
  SET_WEEK_BEING_VIEWED = 'SET_WEEK_BEING_VIEWED',
  ADD_TO_AVERAGE_WEEKLY_POINTS = 'ADD_TO_AVERAGE_WEEKLY_POINTS',
  ADD_TO_TOP_WEEKLY_PLAYERS = 'ADD_TO_TOP_WEEKLY_PLAYERS',
  ADD_TO_TOP_WEEKLY_USERS = 'ADD_TO_TOP_WEEKLY_USERS',
  SET_TOTAL_NUMBER_OF_WEEKS = 'SET_TOTAL_NUMBER_OF_WEEK;',
	SET_TOTAL_POINTS = 'SET_TOTAL_POINTS',
	SET_WEEKLY_POINTS = 'SET_WEEKLY_POINTS',
	SET_BUDGET = 'SET_BUDGET',
	SET_MOST_VALUABLE = 'SET_MOST_VALUABLE',
	SET_STATS_HISTORY = 'SET_STATS_HISTORY',
	SET_RULES = 'SET_RULES'
}

export interface SetRules {
  type: ActionTypes.SET_RULES;
  payload: {rules: Rules};
}

export interface SetStatsHistory {
  type: ActionTypes.SET_STATS_HISTORY;
  payload: { week:number, statsHistory: TeamHistory[] };
}

export interface SetWeekBeingViewed {
  type: ActionTypes.SET_WEEK_BEING_VIEWED;
  payload: { week: number };
}

export interface AddToAverageWeeklyPoints {
  type: ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS;
  payload: { weekId: number; averageWeeklyPoints: number };
}

export interface AddToTopWeeklyPlayers {
  type: ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS;
  payload: { weekId: number; player: PlayerDTO };
}

export interface AddToTopWeeklyUsers {
  type: ActionTypes.ADD_TO_TOP_WEEKLY_USERS;
  payload: { weekId: number; user: TopWeeklyUser };
}

export interface SetTotalNumberOfWeeks {
  type: ActionTypes.SET_TOTAL_NUMBER_OF_WEEKS;
  payload: { numberOfWeeks: number };
}

export interface SetTotalPoints {
  type: ActionTypes.SET_TOTAL_POINTS;
  payload: { user: string, points: number };
}

export interface SetWeeklyPoints {
  type: ActionTypes.SET_WEEKLY_POINTS;
  payload: { user: string, points: number, week: number };
}

export interface SetBudget {
  type: ActionTypes.SET_BUDGET;
  payload: { user: string, budget: number };
}

export interface SetMostValuablee {
  type: ActionTypes.SET_MOST_VALUABLE;
  payload: { user: string, mostValuable: MostValuable };
}

export const setRules = (rules: Rules): SetRules => {
	return {
		type: ActionTypes.SET_RULES,
		payload: {
			rules
		}
	};
};

export const setStatsHistory = (week:number, statsHistory: TeamHistory[]): SetStatsHistory => {
	return {
		type: ActionTypes.SET_STATS_HISTORY,
		payload: {
			week, statsHistory
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

export const addToTopWeeklyPlayers = (
	weekId: number,
	player: PlayerDTO
): AddToTopWeeklyPlayers => {
	return {
		type: ActionTypes.ADD_TO_TOP_WEEKLY_PLAYERS,
		payload: { weekId, player }
	};
};

export const addToAverageWeeklyPoints = (
	weekId: number,
	averageWeeklyPoints: number
): AddToAverageWeeklyPoints => {
	return {
		type: ActionTypes.ADD_TO_AVERAGE_WEEKLY_POINTS,
		payload: { weekId, averageWeeklyPoints }
	};
};

export const addToTopWeeklyUsers = (
	weekId: number,
	user: TopWeeklyUser
): AddToTopWeeklyUsers => {
	return {
		type: ActionTypes.ADD_TO_TOP_WEEKLY_USERS,
		payload: { weekId, user }
	};
};

export const setTotalNumberOfWeeks = (numberOfWeeks: number): SetTotalNumberOfWeeks => {
	return {
		type: ActionTypes.SET_TOTAL_NUMBER_OF_WEEKS,
		payload: { numberOfWeeks }
	};
};

export const setTotalPoints = (user: string, points: number): SetTotalPoints => {
	return {
		type: ActionTypes.SET_TOTAL_POINTS,
		payload: { user, points }
	};
};

export const setWeeklyPoints = (user: string, points: number, week: number): SetWeeklyPoints => {
	return {
		type: ActionTypes.SET_WEEKLY_POINTS,
		payload: { user, points, week }
	};
};

export const setBudget = (user: string, budget: number): SetBudget => {
	return {
		type: ActionTypes.SET_BUDGET,
		payload: { user, budget }
	};
};

export const setMostValuable = (user: string, mostValuable: MostValuable): SetMostValuablee => {
	return {
		type: ActionTypes.SET_MOST_VALUABLE,
		payload: { user, mostValuable }
	};
};

export type Action =
  | SetWeekBeingViewed
  | AddToAverageWeeklyPoints
  | AddToTopWeeklyPlayers
  | AddToTopWeeklyUsers
  | SetTotalNumberOfWeeks
	| SetTotalPoints
	| SetWeeklyPoints
	| SetBudget
	| SetMostValuablee
	| SetStatsHistory
	| SetRules;
