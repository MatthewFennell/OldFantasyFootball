import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getAdminPageBeingViewedState = (state: State) => state.admin;
export const getAdminPageBeingViewed = createSelector(
	[getAdminPageBeingViewedState],
	p => p.adminPageBeingViewed
);

const getTeamAddingPointsState = (state: State) => state.admin;
export const getTeamAddingPoints = createSelector(
	[getTeamAddingPointsState],
	p => p.teamAddingPoints
);

const getPlayersInFilteredTeamState = (state: State) => state.admin;
export const getPlayersInFilteredTeam = createSelector(
	[getPlayersInFilteredTeamState],
	p => p.playersInFilteredTeam
);

const getAllCollegeTeamsState = (state: State) => state.admin;
export const getAllCollegeTeams = createSelector([getAllCollegeTeamsState], p => p.allCollegeTeams);
