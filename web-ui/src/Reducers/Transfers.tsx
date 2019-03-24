import { ActionTypes, Action as AccountAction } from '../Actions/TransferActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  remainingBudget: number;
  remainingTransfers: number;
  filteredPlayers: PlayerDTO[];
  transferMarketOpen: boolean;
}

// Define our initialState
export const initialState: State = {
	remainingBudget: 0,
	remainingTransfers: 0,
	filteredPlayers: [],
	transferMarketOpen: false
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

	case ActionTypes.SET_TRANSFER_MARKET: {
		return {
			...state,
			transferMarketOpen: action.payload.transferMarketOpen
		};
	}

	case ActionTypes.REVERSE_FILTERED_PLAYERS: {
		return {
			...state,
			filteredPlayers: state.filteredPlayers.reverse()
		};
	}

	default:
		return state;
	}
};
