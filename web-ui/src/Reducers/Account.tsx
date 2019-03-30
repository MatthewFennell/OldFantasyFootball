import { ActionTypes, Action as AccountAction } from '../Actions/AccountActions';
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
		return {
			...state,
			firstName: action.payload.firstName
		};
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
		return {
			...state,
			pageBeingViewed: action.payload.pageToView
		};
	}

	case ActionTypes.RESET_ACCOUNT: {
		return initialState;
	}

	default:
		return state;
	}
};
