import { ActionTypes, Action as AccountAction } from '../Actions/AccountActions';
import {
  ActionTypes as TransactionActionTypes,
  Action as TransactionAction
} from '../Actions/TransactionActions';

type Action = AccountAction | TransactionAction;

// Define our State interface for the current reducer
export interface State {
  id: string;
  firstName: string;
  surname: string;
  username: string;
  email: string;
  balance: number;
}

// Define our initialState
export const initialState: State = {
  id: '',
  firstName: '',
  surname: '',
  email: '',
  username: '',
  balance: 0
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
      const { id, surname, username, email, balance } = state;
      const firstName = action.payload.firstName;
      return {
        id,
        firstName,
        surname,
        username,
        email,
        balance
      };
    }

    case ActionTypes.SET_ACCOUNT: {
      const { id, firstName, surname, username, email, balance } = action.payload.account;

      return {
        id,
        firstName,
        surname,
        username,
        email,
        balance
      };
    }

    case ActionTypes.RESET_ACCOUNT: {
      return initialState;
    }

    case TransactionActionTypes.LATEST_TRANSACTIONS_SUCCESS: {
      const balanceChange = action.payload.latestTransactions.reduce(
        (balance: number, transaction) => {
          return balance + transaction.amount;
        },
        0
      );
      return {
        ...state,
        balance: state.balance + balanceChange
      };
    }

    default:
      return state;
  }
};
