import { ActionTypes, Action as AccountAction } from '../Actions/TransferActions';
import { FilteredPlayer } from '../Models/Interfaces/FilteredPlayer';
import { PlayerDTO } from '../Models/Interfaces/Player';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  remainingBudget: number;
  remainingTransfers: number;
  filteredPlayers: FilteredPlayer[];
  playersBeingAdded: PlayerDTO[];
  playersBeingRemoved: PlayerDTO[];
}

// Define our initialState
export const initialState: State = {
  remainingBudget: 100,
  remainingTransfers: 0,
  filteredPlayers: [],
  playersBeingAdded: [],
  playersBeingRemoved: []
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
    case ActionTypes.ADD_TO_PLAYERS_BEING_ADDED: {
      const playerToAdd = action.payload.playerBeingAdded;
      return {
        ...state,
        playersBeingAdded: state.playersBeingAdded.concat(playerToAdd)
      };
    }
    case ActionTypes.REMOVE_FROM_PLAYERS_BEING_ADDED: {
      return {
        ...state,
        playersBeingAdded: state.playersBeingAdded.filter(
          (item, index) => action.payload.indexToRemove !== index
        )
      };
    }

    case ActionTypes.CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED: {
      return {
        ...state,
        playersBeingAdded: [],
        playersBeingRemoved: []
      };
    }

    case ActionTypes.ADD_TO_PLAYERS_BEING_REMOVED: {
      const playerToAdd = action.payload.playerBeingAdded;
      return {
        ...state,
        playersBeingRemoved: state.playersBeingRemoved.concat(playerToAdd)
      };
    }
    case ActionTypes.REMOVE_FROM_PLAYERS_BEING_REMOVED: {
      return {
        ...state,
        playersBeingRemoved: state.playersBeingRemoved.filter(
          (item, index) => action.payload.indexToRemove !== index
        )
      };
    }

    default:
      return state;
  }
};
