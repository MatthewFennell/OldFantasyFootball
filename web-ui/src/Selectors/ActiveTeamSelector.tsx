import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getUserBeingViewedState = (state: State) => state.teamInfo;
export const getUserBeingViewed = createSelector([getUserBeingViewedState], a => a.userBeingViewed);

const getTeamState = (state: State) => state.teamInfo;
export const getTeam = createSelector([getTeamState], a => a.team);

const getTeamToRenderState = (state: State) => state;
export const getTeamToRender = createSelector([getTeamToRenderState], p => {
	return p.teamInfo.team[p.teamInfo.userBeingViewed] !== undefined && p.teamInfo.team[p.teamInfo.userBeingViewed]['week-' + p.stats.weekBeingViewed] !== undefined
		? p.teamInfo.team[p.teamInfo.userBeingViewed]['week-' + p.stats.weekBeingViewed] : [];
});
