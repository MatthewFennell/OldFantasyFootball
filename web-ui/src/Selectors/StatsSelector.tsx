import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getWeekBeingViewedState = (state: State) => state.stats;
export const getWeekBeingViewed = createSelector([getWeekBeingViewedState], p => p.weekBeingViewed);

const getWeeklyPointsCacheState = (state: State) => state.stats;
export const getWeeklyPointsCache = createSelector(
  [getWeeklyPointsCacheState],
  p => p.weeklyPointsCache
);

const getAverageWeeklyPointsCacheState = (state: State) => state.stats;
export const getAverageWeeklyPointsCache = createSelector(
  [getAverageWeeklyPointsCacheState],
  p => p.averageWeeklyPointsCache
);

const getTopWeeklyPlayerCacheState = (state: State) => state.stats;
export const getTopWeeklyPlayerCache = createSelector(
  [getTopWeeklyPlayerCacheState],
  p => p.topWeeklyPlayersCache
);

const getTopWeeklyUserCacheState = (state: State) => state.stats;
export const getTopWeeklyUserCache = createSelector(
  [getTopWeeklyUserCacheState],
  p => p.topWeeklyUsersCache
);

const getTotalNumberOfWeeksState = (state: State) => state.stats;
export const getTotalNumberOfWeeks = createSelector(
  [getTotalNumberOfWeeksState],
  p => p.totalNumberOfWeeks
);
