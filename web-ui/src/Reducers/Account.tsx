import { ActionTypes, Action as AccountAction } from '../Actions/AccountActions';
import * as lodash from 'lodash/fp';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  id: string;
  firstName: string;
  surname: string;
  username: string;
  pageBeingViewed: string;
  weekBeingViewed: number;
}

// Define our initialState
export const initialState: State = {
	id: '',
	firstName: '',
	surname: '',
	username: '',
	pageBeingViewed: 'Team',
	weekBeingViewed: 0,
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_ACCOUNT: {
		const {
			id,
			firstName,
			surname,
			username,
		} = action.payload.account;

		return {
			id,
			firstName,
			surname,
			username,
		};
	}

	case ActionTypes.SET_PAGE_BEING_VIEWED: {
		return lodash.set('pageBeingViewed', action.payload.pageToView, state);
	}

	case ActionTypes.RESET_ACCOUNT: {
		return initialState;
	}

	default:
		return state;
	}
};
