import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getAdminPageBeingViewedState = (state: State) => state.admin;
export const getAdminPageBeingViewed = createSelector(
  [getAdminPageBeingViewedState],
  p => p.adminPageBeingViewed
);
