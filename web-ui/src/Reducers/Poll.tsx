import { ActionTypes, Action } from '../Actions/PollActions';

export interface State {
  isPolling: boolean;
}

export const initialState: State = {
  isPolling: false
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.START_POLLING: {
      return {
        ...state,
        isPolling: true
      };
    }

    case ActionTypes.STOP_POLLING: {
      return {
        ...state,
        isPolling: false
      };
    }

    default:
      return state;
  }
};
