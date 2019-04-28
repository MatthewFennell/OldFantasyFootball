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

const getStatsHistoryState = (state: State) => state.stats;
export const getStatsHistory = createSelector([getStatsHistoryState], p => p.history);

const getRulesState = (state: State) => state.stats;
export const getRules = createSelector([getRulesState], p => p.rules);

const getTotalPointsForUserState = (state: State) => state;
export const getTotalPointsForUser = createSelector([getTotalPointsForUserState], p => p.stats.totalPoints[p.teamInfo.userBeingViewed]);

const getWeekPointsForUserState = (state: State) => state;
export const getWeekPointsForUser = createSelector([getWeekPointsForUserState], p => {
	return p.stats.weeklyPoints[p.teamInfo.userBeingViewed] !== undefined ? p.stats.weeklyPoints[p.teamInfo.userBeingViewed][p.stats.weekBeingViewed] : 0;
});

const getMostValuablePlayerNameState = (state: State) => state;
export const getMostValuablePlayerName = createSelector([getMostValuablePlayerNameState], p => {
	return p.stats.mostValuable[p.teamInfo.userBeingViewed] !== undefined ? p.stats.mostValuable[p.teamInfo.userBeingViewed]['mostValuablePlayer'].firstName + ' ' +
	p.stats.mostValuable[p.teamInfo.userBeingViewed]['mostValuablePlayer'].surname : '';
});

const getMostValuablePlayerPointsState = (state: State) => state;
export const getMostValuablePlayerPointsName = createSelector([getMostValuablePlayerPointsState], p => {
	return p.stats.mostValuable[p.teamInfo.userBeingViewed] !== undefined ? p.stats.mostValuable[p.teamInfo.userBeingViewed]['mostValuablePlayerScore'] : '';
});

const getTopWeeklyPlayerNameState = (state: State) => state;
export const getTopWeeklyPlayerName = createSelector([getTopWeeklyPlayerNameState], p => {
	return p.stats.topWeeklyPlayers[p.stats.weekBeingViewed] !== undefined ? p.stats.topWeeklyPlayers[p.stats.weekBeingViewed].firstName +
	' ' + p.stats.topWeeklyPlayers[p.stats.weekBeingViewed].surname : '';
});

const getTopWeeklyPlayerPointsState = (state: State) => state;
export const getTopWeeklyPlayerPoints = createSelector([getTopWeeklyPlayerPointsState], p => {
	return p.stats.topWeeklyPlayers[p.stats.weekBeingViewed] !== undefined ? p.stats.topWeeklyPlayers[p.stats.weekBeingViewed].points : '';
});

const getTopWeeklyUsersNameState = (state: State) => state;
export const getTopWeeklyUserName = createSelector([getTopWeeklyUsersNameState], p => {
	return p.stats.topWeeklyUsers[p.stats.weekBeingViewed] !== undefined ? p.stats.topWeeklyUsers[p.stats.weekBeingViewed].firstName +
	' ' + p.stats.topWeeklyUsers[p.stats.weekBeingViewed].surname : '';
});

const getTopWeeklyUserPointsState = (state: State) => state;
export const getTopWeeklyUserPoints = createSelector([getTopWeeklyUserPointsState], p => {
	return p.stats.topWeeklyUsers[p.stats.weekBeingViewed] !== undefined ? p.stats.topWeeklyUsers[p.stats.weekBeingViewed].points : '';
});

const getRemainingBudgetOfUserState = (state: State) => state;
export const getRemainingBudgetOfUser = createSelector([getRemainingBudgetOfUserState], p => {
	return p.stats.budget[p.teamInfo.userBeingViewed];
});

const getAverageWeeklyPointsOfWeekState = (state: State) => state.stats;
export const getAverageWeeklyPointsOfWeek = createSelector([getAverageWeeklyPointsOfWeekState], p => {
	return p.averageWeeklyPoints[p.weekBeingViewed];
});
