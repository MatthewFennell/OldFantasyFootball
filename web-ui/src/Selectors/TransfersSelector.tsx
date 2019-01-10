import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getRemainingBudgetState = (state: State) => state.transfers;
export const getRemainingBudget = createSelector([getRemainingBudgetState], a => a.remainingBudget);

const getRemainingTransfersState = (state: State) => state.transfers;
export const getRemainingTransfers = createSelector(
  [getRemainingTransfersState],
  a => a.remainingTransfers
);
