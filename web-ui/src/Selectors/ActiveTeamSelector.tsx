import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getActiveTeamState = (state: State) => state.activeTeam;
export const getActiveTeam = createSelector([getActiveTeamState], a => a.activeTeam);

const getWeeklyTeamCacheState = (state: State) => state.activeTeam;
export const getWeeklyTeamCache = createSelector([getWeeklyTeamCacheState], a => a.weeklyTeamCache);

const getUserBeingViewedState = (state: State) => state.activeTeam;
export const getUserBeingViewed = createSelector([getUserBeingViewedState], a => a.userBeingViewed);
