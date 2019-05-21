import { ActionTypes, Action as AccountAction } from '../Actions/TransferActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import * as lodash from 'lodash/fp';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  filteredPlayers: PlayerDTO[];
  transferMarketOpen: boolean;
  originalTransferTeam: PlayerDTO[];
  playersToAdd: PlayerDTO[];
  playersToRemove: PlayerDTO[];
  currentTransferTeam: PlayerDTO[];
}

// Define our initialState
export const initialState: State = {
	filteredPlayers: [],
	transferMarketOpen: false,
	originalTransferTeam: [],
	playersToAdd: [],
	playersToRemove: [],
	currentTransferTeam: []
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_FILTERED_PLAYERS: {
		return lodash.set('filteredPlayers', action.payload.filteredPlayers, state);
	}

	case ActionTypes.SET_TRANSFER_MARKET: {
		return lodash.set('transferMarketOpen', action.payload.transferMarketOpen, state);
	}

	case ActionTypes.RESET_CHANGES: {
		return {
			...state,
			playersToAdd: [],
			playersToRemove: [],
			currentTransferTeam: state.originalTransferTeam
		};
	}

	case ActionTypes.REVERSE_FILTERED_PLAYERS: {
		return lodash.set('filteredPlayers', state.filteredPlayers.reverse(), state);
	}

	case ActionTypes.SET_CURRENT_TRANSFER_TEAM: {
		return lodash.set('currentTransferTeam', action.payload.currentTransferTeam, state);
	}

	case ActionTypes.SET_ORIGINAL_TRANSFER_TEAM: {
		return lodash.set('originalTransferTeam', action.payload.originalTransferTeam, state);
	}

	case ActionTypes.CLEAR_PLAYERS_BEING_ADDED_AND_REMOVED: {
		state = lodash.set('playersToAdd', [], state);
		state = lodash.set('playersToRemove', [], state);
		state = lodash.set('currentTransferTeam', state.currentTransferTeam.filter(player => player.firstName !== 'REMOVED'), state);
		return state;
	}

	case ActionTypes.REMOVE_PLAYER: {
		const playerToRemove = action.payload.playerToRemove;

		const playerAlreadyBeingAdded = state.playersToAdd.find(player => player.id === playerToRemove.id);

		const stateWithoutPlayer = lodash.set('currentTransferTeam', state.currentTransferTeam.map(
			player => player.id === playerToRemove.id ? { id: playerToRemove.id, position: playerToRemove.position, firstName: 'REMOVED' } : player), state);

		if (playerAlreadyBeingAdded === undefined) {
			return lodash.set('playersToRemove', state.playersToRemove.concat([playerToRemove]), stateWithoutPlayer);
		} else {
			return lodash.set('playersToAdd', state.playersToAdd.filter(player => player.id !== playerToRemove.id), stateWithoutPlayer);
		}
	}

	case ActionTypes.ADD_PLAYER: {
		const playerToAdd = action.payload.playerToAdd;
		const playerAlreadyBeingRemoved = state.playersToRemove.find(player => player.id === playerToAdd.id);

		const emptySpotInRow = state.currentTransferTeam.findIndex(player => player.position === playerToAdd.position && player.firstName === 'REMOVED');

		state = emptySpotInRow === -1 ? lodash.set('currentTransferTeam', state.currentTransferTeam.concat([playerToAdd]), state)
			: lodash.set('currentTransferTeam', state.currentTransferTeam.map((player, index) => index === emptySpotInRow ? playerToAdd : player), state);

		const numberOfValidRemainingSpots = 11 - state.currentTransferTeam.filter(player => player.firstName !== 'REMOVED').length;
		const numberOfSpareDefenders = state.currentTransferTeam.filter(x => x.firstName === 'REMOVED' && x.position === 'DEFENDER').length;
		const numberOfSpareMidfielders = state.currentTransferTeam.filter(x => x.firstName === 'REMOVED' && x.position === 'MIDFIELDER').length;
		const numberOfSpareAttackers = state.currentTransferTeam.filter(x => x.firstName === 'REMOVED' && x.position === 'ATTACKER').length;

		if (numberOfSpareDefenders > numberOfValidRemainingSpots) {
			const location = state.currentTransferTeam.findIndex(x => x.firstName === 'REMOVED' && x.position === 'DEFENDER');
			state = lodash.set('currentTransferTeam', state.currentTransferTeam.filter((player, index) => index !== location), state);
		}

		if (numberOfSpareMidfielders > numberOfValidRemainingSpots) {
			const location = state.currentTransferTeam.findIndex(x => x.firstName === 'REMOVED' && x.position === 'MIDFIELDER');
			state = lodash.set('currentTransferTeam', state.currentTransferTeam.filter((player, index) => index !== location), state);
		}

		if (numberOfSpareAttackers > numberOfValidRemainingSpots) {
			const location = state.currentTransferTeam.findIndex(x => x.firstName === 'REMOVED' && x.position === 'ATTACKER');
			state = lodash.set('currentTransferTeam', state.currentTransferTeam.filter((player, index) => index !== location), state);
		}

		if (playerAlreadyBeingRemoved === undefined) {
			return lodash.set('playersToAdd', state.playersToAdd.concat([playerToAdd]), state);
		} else {
			return lodash.set('playersToRemove', state.playersToRemove.filter(player => player.id !== playerToAdd.id), state);
		}
	}

	default:
		return state;
	}
};
