import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getLeagueCacheState = (state: State) => state.league;
export const getLeagueCache = createSelector([getLeagueCacheState], p => p.leagueCache);

const getLeaguePageBeingViewedState = (state: State) => state.league;
export const getLeaguePageBeingViewed = createSelector(
	[getLeaguePageBeingViewedState],
	p => p.leaguePageBeingViewed
);

const getLeagueRankingsState = (state: State) => state.league;
export const getLeagueRankings = createSelector([getLeagueRankingsState], p => p.leagueRankings);

const getIsLeagueAdminState = (state: State) => state.league;
export const getIsLeagueAdmin = createSelector([getIsLeagueAdminState], p => p.isAdmin);

const getLeagueCodeState = (state: State) => state.league;
export const getLeagueCode = createSelector([getLeagueCodeState], p => p.code);

const getLeaguesState = (state: State) => state.league;
export const getLeagues = createSelector([getLeaguesState], p => p.leagues);
