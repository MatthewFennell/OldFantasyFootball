import { ActionTypes, Action as AdminAction } from '../Actions/AdminActions';
type Action = AdminAction;

// Define our State interface for the current reducer
export interface State {
  adminPageBeingViewed: string;
}

// Define our initialState
export const initialState: State = {
  adminPageBeingViewed: 'home'
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_ADMIN_PAGE_BEING_VIEWED: {
      return {
        ...state,
        adminPageBeingViewed: action.payload.adminPageBeingViewed
      };
    }

    default:
      return state;
  }
};
