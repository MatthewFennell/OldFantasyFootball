import { ActionTypes, Action as AccountAction } from '../Actions/TransferActions';
import { FilteredPlayer } from '../Models/Interfaces/FilteredPlayer';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  remainingBudget: number;
  remainingTransfers: number;
  filteredPlayers: FilteredPlayer[];
}

// Define our initialState
export const initialState: State = {
  remainingBudget: 100,
  remainingTransfers: 0,
  filteredPlayers: []
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_REMAINING_BUDGET: {
      return {
        ...state,
        remainingBudget: action.payload.remainingBudget
      };
    }
    case ActionTypes.SET_REMAINING_TRANSFERS: {
      return {
        ...state,
        remainingTransfers: action.payload.remainingTransfers
      };
    }
    case ActionTypes.SET_FILTERED_PLAYERS: {
      return {
        ...state,
        filteredPlayers: action.payload.filteredPlayers
      };
    }
    default:
      return state;
  }
};
