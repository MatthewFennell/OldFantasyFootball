import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getWeekBeingViewedState = (state: State) => state.stats;
export const getWeekBeingViewed = createSelector([getWeekBeingViewedState], p => p.weekBeingViewed);

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

const getTotalPointsCacheState = (state: State) => state.stats;
export const getTotalPointsCache = createSelector([getTotalPointsCacheState], p => p.totalPointsCache);

const getWeeklyPointsState = (state: State) => state.stats;
export const getWeeklyPoints = createSelector([getWeeklyPointsState], p => p.weeklyPoints);

const getRemainingBudgetState = (state: State) => state.stats;
export const getRemainingBudget = createSelector([getRemainingBudgetState], p => p.budget);

const getMostValuableCacheState = (state: State) => state.stats;
export const getMostValuableCache = createSelector([getMostValuableCacheState], p => p.mostValuableCache);
