import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getTotalPointsState = (state: State) => state.stats;
export const getTotalPoints = createSelector([getTotalPointsState], a => a.totalPoints);
