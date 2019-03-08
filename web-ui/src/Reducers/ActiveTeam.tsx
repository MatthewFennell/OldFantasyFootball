import { ActionTypes, Action as ActiveTeamAction } from '../Actions/ActiveTeamActions';
// import { WeeklyPlayer } from '../Models/Interfaces/WeeklyPlayer';
import { PlayerDTO } from '../Models/Interfaces/Player';

type Action = ActiveTeamAction;

// Define our State interface for the current reducer
export interface State {
  activeTeam: PlayerDTO[];
  weeklyTeamCache: {};
}

// Define our initialState
export const initialState: State = {
	activeTeam: [],
	weeklyTeamCache: {} as { weeklyTeam: { id: number; team: PlayerDTO[] } }
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.ADD_PLAYER: {
		const playerToAdd = action.payload.player;
		return {
			...state,
			activeTeam: state.activeTeam.concat(playerToAdd)
		};
	}

	case ActionTypes.SET_TEAM: {
		const activeTeam = action.payload.activeTeam;
		return {
			...state,
			activeTeam
		};
	}

	case ActionTypes.ADD_TO_WEEKLY_TEAM_CACHE: {
		return {
			...state,
			weeklyTeamCache: {
				...state.weeklyTeamCache,
				[action.payload.weekId]: action.payload.team
			}
		};
	}

	// Removes the index
	case ActionTypes.REMOVE_INDEX: {
		return {
			...state,
			activeTeam: state.activeTeam.filter((item, index) => action.payload.indexToRemove !== index)
		};
	}

	default:
		return state;
	}
};
