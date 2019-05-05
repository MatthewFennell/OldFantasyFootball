import { combineReducers } from 'redux';
import { reducer as account, State as AccountState } from './Account';
import { reducer as teamInfo, State as teamInfoState } from './ActiveTeam';
import { reducer as stats, State as statsState } from './Stats';
import { reducer as league, State as leagueState } from './League';
import { reducer as admin, State as adminState } from './Admin';
import { reducer as transfers, State as transfersState } from './Transfers';
import { reducer as formReducer, FormReducer } from 'redux-form';

export enum ActionTypes {
  LOGOUT = 'LOGOUT'
}

export interface Logout {
  type: ActionTypes.LOGOUT;
  payload: { };
}

export const logout = (): Logout => {
	return {
		type: ActionTypes.LOGOUT,
		payload: {}
	};
};

export type Action =
  | Logout;

export interface State {
  account: AccountState;
  formReducer: FormReducer;
  teamInfo: teamInfoState;
  stats: statsState;
  league: leagueState;
  transfers: transfersState;
  admin: adminState;
}

const rootReducer = combineReducers<State>({
	account,
	teamInfo,
	stats,
	league,
	transfers,
	admin,
	form: formReducer
} as any);

const root = (state: any, action: any) => {
	if (action.type === ActionTypes.LOGOUT) {
		state = undefined;
	}
	return rootReducer(state, action);
};

export default root;
