import { ActionTypes, Action as AccountAction } from '../Actions/TransferActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import * as lodash from 'lodash/fp';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  filteredPlayers: PlayerDTO[];
  transferMarketOpen: boolean;
}

// Define our initialState
export const initialState: State = {
	filteredPlayers: [],
	transferMarketOpen: false
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_FILTERED_PLAYERS: {
		return lodash.set('filteredPlayers', action.payload.filteredPlayers, state);
	}

	case ActionTypes.SET_TRANSFER_MARKET: {
		return lodash.set('transferMarketOpen', action.payload.transferMarketOpen, state);
	}

	case ActionTypes.REVERSE_FILTERED_PLAYERS: {
		return lodash.set('filteredPlayers', state.filteredPlayers.reverse(), state);
	}

	default:
		return state;
	}
};
