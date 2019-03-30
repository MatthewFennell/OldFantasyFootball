import { ActionTypes, Action as AccountAction } from '../Actions/AccountActions';
import * as lodash from 'lodash/fp';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  id: string;
  firstName: string;
  surname: string;
  username: string;
  email: string;
  pageBeingViewed: string;
  weekBeingViewed: number;
  roles: string[];
}

// Define our initialState
export const initialState: State = {
	id: '',
	firstName: '',
	surname: '',
	email: '',
	username: '',
	pageBeingViewed: 'Team',
	weekBeingViewed: 0,
	roles: []
};

export const reducer = (state: State = initialState, action: Action) => {
	switch (action.type) {
	case ActionTypes.SET_FIRSTNAME: {
		return lodash.set('firstName', action.payload.firstName, state);
	}

	case ActionTypes.SET_ACCOUNT: {
		const {
			id,
			firstName,
			surname,
			username,
			email,
			roles
		} = action.payload.account;

		return {
			id,
			firstName,
			surname,
			username,
			email,
			roles
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
