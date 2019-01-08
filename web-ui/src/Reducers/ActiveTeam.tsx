import { ActionTypes, Action as ActiveTeamAction } from '../Actions/ActiveTeamActions';
import { WeeklyPlayer } from '../Models/Interfaces/WeeklyPlayer';

type Action = ActiveTeamAction;

// Define our State interface for the current reducer
export interface State {
  activeTeam: Array<WeeklyPlayer>;
}

// Define our initialState
export const initialState: State = {
  activeTeam: []
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

    default:
      return state;
  }
};
