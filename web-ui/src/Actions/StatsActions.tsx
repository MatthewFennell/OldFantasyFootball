export enum ActionTypes {
  SET_TOTAL_POINTS = 'SET_TOTAL_POINTS'
}

export interface SetTotalPoints {
  type: ActionTypes.SET_TOTAL_POINTS;
  payload: { totalPoints: number };
}

export const setTotalPoints = (totalPoints: number): SetTotalPoints => {
  return {
    type: ActionTypes.SET_TOTAL_POINTS,
    payload: {
      totalPoints
    }
  };
};

export type Action = SetTotalPoints;
