import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getUserBeingViewedState = (state: State) => state.activeTeam;
export const getUserBeingViewed = createSelector([getUserBeingViewedState], a => a.userBeingViewed);

const getTeamCacheState = (state: State) => state.activeTeam;
export const getTeamCache = createSelector([getTeamCacheState], a => a.teamCache);
