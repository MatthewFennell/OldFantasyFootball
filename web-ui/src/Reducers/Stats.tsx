import { ActionTypes, Action as StatsAction } from '../Actions/StatsActions';
type Action = StatsAction;

// Define our State interface for the current reducer
export interface State {
  totalPoints: number;
}

// Define our initialState
export const initialState: State = {
  totalPoints: 0
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_TOTAL_POINTS: {
      const totalPoints = action.payload.totalPoints;
      return {
        ...state,
        totalPoints
      };
    }

    default:
      return state;
  }
};
