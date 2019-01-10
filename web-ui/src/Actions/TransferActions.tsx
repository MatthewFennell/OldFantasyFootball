export enum ActionTypes {
  SET_REMAINING_BUDGET = 'SET_REMAINING_BUDGET',
  SET_REMAINING_TRANSFERS = 'SET_REMAINING_TRANSFERS'
}

export interface SetRemainingBudget {
  type: ActionTypes.SET_REMAINING_BUDGET;
  payload: { remainingBudget: number };
}

export interface SetRemainingTransfers {
  type: ActionTypes.SET_REMAINING_TRANSFERS;
  payload: { remainingTransfers: number };
}

export const setRemainingBudget = (remainingBudget: number): SetRemainingBudget => {
  return {
    type: ActionTypes.SET_REMAINING_BUDGET,
    payload: { remainingBudget }
  };
};

export const setRemainingTransfers = (remainingTransfers: number): SetRemainingTransfers => {
  return {
    type: ActionTypes.SET_REMAINING_TRANSFERS,
    payload: { remainingTransfers }
  };
};

export type Action = SetRemainingBudget | SetRemainingTransfers;
