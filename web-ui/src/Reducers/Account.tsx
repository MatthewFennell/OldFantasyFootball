import { ActionTypes, Action as AccountAction } from '../Actions/AccountActions';
type Action = AccountAction;

// Define our State interface for the current reducer
export interface State {
  id: string;
  firstName: string;
  surname: string;
  username: string;
  email: string;
  balance: number;
  pageBeingViewed: string;
  totalPoints: number;
  weekBeingViewed: number;
}

// Define our initialState
export const initialState: State = {
  id: '',
  firstName: '',
  surname: '',
  email: '',
  username: '',
  balance: 0,
  pageBeingViewed: 'Team',
  totalPoints: 0,
  weekBeingViewed: 0
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_BALANCE: {
      const balance = action.payload.balance;
      return {
        ...state,
        balance
      };
    }

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
        balance,
        totalPoints
      } = action.payload.account;

      return {
        id,
        firstName,
        surname,
        username,
        email,
        balance,
        totalPoints
      };
    }

    case ActionTypes.SET_PAGE_BEING_VIEWED: {
      return {
        ...state,
        pageBeingViewed: action.payload.pageToView
      };
    }

    case ActionTypes.SET_TOTAL_POINTS: {
      return {
        ...state,
        totalPoints: action.payload.totalPoints
      };
    }

    case ActionTypes.RESET_ACCOUNT: {
      return initialState;
    }

    default:
      return state;
  }
};
