import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getWeekBeingViewedState = (state: State) => state.stats;
export const getWeekBeingViewed = createSelector([getWeekBeingViewedState], p => p.weekBeingViewed);

const getAverageWeeklyPointsState = (state: State) => state.stats;
export const getAverageWeeklyPoints = createSelector(
	[getAverageWeeklyPointsState],
	p => p.averageWeeklyPoints
);

const getTopWeeklyPlayerState = (state: State) => state.stats;
export const getTopWeeklyPlayer = createSelector(
	[getTopWeeklyPlayerState],
	p => p.topWeeklyPlayers
);

const getTopWeeklyUserState = (state: State) => state.stats;
export const getTopWeeklyUser = createSelector(
	[getTopWeeklyUserState],
	p => p.topWeeklyUsers
);

const getTotalNumberOfWeeksState = (state: State) => state.stats;
export const getTotalNumberOfWeeks = createSelector(
	[getTotalNumberOfWeeksState],
	p => p.totalNumberOfWeeks
);

const getTotalPointsState = (state: State) => state.stats;
export const getTotalPoints = createSelector([getTotalPointsState], p => p.totalPoints);

const getWeeklyPointsState = (state: State) => state.stats;
export const getWeeklyPoints = createSelector([getWeeklyPointsState], p => p.weeklyPoints);

const getRemainingBudgetState = (state: State) => state.stats;
export const getRemainingBudget = createSelector([getRemainingBudgetState], p => p.budget);

const getMostValuableState = (state: State) => state.stats;
export const getMostValuable = createSelector([getMostValuableState], p => p.mostValuable);
