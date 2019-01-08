import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getAveragePointsState = (state: State) => state.stats;
export const getAveragePoints = createSelector([getAveragePointsState], a => a.averagePoints);

const getWeekBeingViewedState = (state: State) => state.stats;
export const getWeekBeingViewed = createSelector([getWeekBeingViewedState], p => p.weekBeingViewed);

const getPointsInActiveWeekState = (state: State) => state.stats;
export const getPointsInActiveWeek = createSelector(
  [getPointsInActiveWeekState],
  p => p.pointsInActiveWeek
);

const getWeeklyPointsCacheState = (state: State) => state.stats;
export const getWeeklyPointsCache = createSelector(
  [getWeeklyPointsCacheState],
  p => p.weeklyPointsCache
);
