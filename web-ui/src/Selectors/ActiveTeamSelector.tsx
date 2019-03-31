import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getUserBeingViewedState = (state: State) => state.teamInfo;
export const getUserBeingViewed = createSelector([getUserBeingViewedState], a => a.userBeingViewed);

const getTeamState = (state: State) => state.teamInfo;
export const getTeam = createSelector([getTeamState], a => a.team);
