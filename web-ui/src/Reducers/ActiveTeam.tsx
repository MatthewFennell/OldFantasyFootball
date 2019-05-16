import { ActionTypes, Action as ActiveTeamAction } from '../Actions/ActiveTeamActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
import * as lodash from 'lodash/fp';

type Action = ActiveTeamAction;

export interface State {
  userBeingViewed: string;
  team: {}
}

export const initialState: State = {
	userBeingViewed: '',
	team: {} as { user: { weeks: { id: string; team: PlayerDTO[] } } },
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_USER_BEING_VIEWED: {
		return lodash.set('userBeingViewed', action.payload.user, state);
	}

	case ActionTypes.SET_TEAM: {
		const { user, week, team } = action.payload;
		return lodash.set('team.' + user + '.' + week, team, state);
	}

	case ActionTypes.ADD_PLAYER: {
		const { user, week, player } = action.payload;
		const team = state.team[user][week];

		const hasEmptyPerson = team.find((x:PlayerDTO) => x.position === player.position && x.firstName === 'empty') !== undefined;
		console.log('Has empty person = ' + hasEmptyPerson);

		if (hasEmptyPerson) {
			let indexOfThem = 0;
			for (let x = 0; x < team.length; x++) {
				if (team[x].position === player.position && team[x].firstName === 'empty') {
					indexOfThem = x;
					break;
				}
				console.log('their index = ' + indexOfThem);
			}
			return lodash.set('team.' + user + '.' + week, team.map((originalPlayer:PlayerDTO, index:number) => index === indexOfThem ? player : originalPlayer), state);
		} else {
			return lodash.set('team.' + user + '.' + week, team.concat(player), state);
		}
	}

	default:
		return state;
	}
};
