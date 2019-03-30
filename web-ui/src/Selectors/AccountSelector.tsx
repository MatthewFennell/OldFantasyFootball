import { State } from '../Reducers/root';
import { createSelector } from 'reselect';

const getFirstNameState = (state: State) => state.account;
export const getFirstName = createSelector([getFirstNameState], s => s.firstName);

const getSurnameState = (state: State) => state.account;
export const getSurname = createSelector([getSurnameState], s => s.surname);

const getPageBeingViewedState = (state: State) => state.account;
export const getPageBeingViewed = createSelector([getPageBeingViewedState], p => p.pageBeingViewed);

const getRolesState = (state: State) => state.account;
export const getRoles = createSelector([getRolesState], p => p.roles);

const getIdState = (state: State) => state.account;
export const getAccountId = createSelector([getIdState], p => p.id);
