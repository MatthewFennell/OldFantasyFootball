import { Account } from '../Models/Interfaces/Account';

export enum ActionTypes {
  SET_ACCOUNT = 'SET_ACCOUNT',
  RESET_ACCOUNT = 'RESET_ACCOUNT',
  SET_PAGE_BEING_VIEWED = 'SET_PAGE_BEING_VIEWED',
}

export interface ResetAccount {
  type: ActionTypes.RESET_ACCOUNT;
  payload: {};
}

export interface SetAccount {
  type: ActionTypes.SET_ACCOUNT;
  payload: {
    account: Account;
  };
}

export interface SetPageBeingViewed {
  type: ActionTypes.SET_PAGE_BEING_VIEWED;
  payload: { pageToView: string };
}

export const resetAccount = (): ResetAccount => {
	return {
		type: ActionTypes.RESET_ACCOUNT,
		payload: {}
	};
};

export const setAccount = (account: Account): SetAccount => {
	return {
		type: ActionTypes.SET_ACCOUNT,
		payload: {
			account
		}
	};
};

export const setPageBeingViewed = (pageToView: string): SetPageBeingViewed => {
	return {
		type: ActionTypes.SET_PAGE_BEING_VIEWED,
		payload: { pageToView }
	};
};

export type Action =
  | SetAccount
  | ResetAccount
  | SetPageBeingViewed;
