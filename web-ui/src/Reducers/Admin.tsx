import { ActionTypes, Action as AdminAction } from '../Actions/AdminActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import { CollegeTeam } from '../Models/Interfaces/CollegeTeam';
import * as lodash from 'lodash/fp';
type Action = AdminAction;

// Define our State interface for the current reducer
export interface State {
  adminPageBeingViewed: string;
  captainPageBeingViewed: string;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
  allCollegeTeams: CollegeTeam[];
}

// Define our initialState
export const initialState: State = {
	adminPageBeingViewed: 'home',
	captainPageBeingViewed: 'home',
	teamAddingPoints: '',
	playersInFilteredTeam: [],
	allCollegeTeams: []
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_ADMIN_PAGE_BEING_VIEWED: {
		return lodash.set('adminPageBeingViewed', action.payload.adminPageBeingViewed, state);
	}

	case ActionTypes.SET_CAPTAIN_PAGE_BEING_VIEWED: {
		return lodash.set('captainPageBeingViewed', action.payload.captainPageBeingViewed, state);
	}

	case ActionTypes.SET_PLAYERS_IN_FILTERED_TEAM: {
		return lodash.set('playersInFilteredTeam', action.payload.players, state);
	}

	case ActionTypes.SET_TEAM_ADDING_POINTS: {
		return lodash.set('teamAddingPoints', action.payload.team, state);
	}

	case ActionTypes.SET_ALL_COLLEGE_TEAMS: {
		return lodash.set('allCollegeTeams', action.payload.teams, state);
	}

	case ActionTypes.ADD_COLLEGE_TEAM: {
		const teamToAdd = action.payload.team;
		return lodash.set('allCollegeTeams', state.allCollegeTeams.concat(teamToAdd), state);
	}

	case ActionTypes.REMOVE_COLLEGE_TEAM: {
		const teamToRemove = action.payload.teamName;
		return lodash.set('allCollegeTeams', state.allCollegeTeams.filter(item => item.name !== teamToRemove), state);
	}

	default:
		return state;
	}
};
