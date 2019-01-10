import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getLeagueCacheState = (state: State) => state.league;
export const getLeagueCache = createSelector([getLeagueCacheState], p => p.leagueCache);

const getLeaguePageBeingViewedState = (state: State) => state.league;
export const getLeaguePageBeingViewed = createSelector(
  [getLeaguePageBeingViewedState],
  p => p.leaguePageBeingViewed
);
