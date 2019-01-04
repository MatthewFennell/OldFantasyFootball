import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getActiveTeamState = (state: State) => state.activeTeam;
export const getActiveTeam = createSelector([getActiveTeamState], a => a.activeTeam);
