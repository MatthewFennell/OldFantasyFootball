import { combineReducers } from 'redux';
import { reducer as account, State as AccountState } from './Account';
import { reducer as activeTeam, State as activeTeamState } from './ActiveTeam';
import { reducer as stats, State as statsState } from './Stats';
import { reducer as league, State as leagueState } from './League';
import { reducer as admin, State as adminState } from './Admin';
import { reducer as transfers, State as transfersState } from './Transfers';
import { reducer as formReducer, FormReducer } from 'redux-form';

export interface State {
  account: AccountState;
  formReducer: FormReducer;
  activeTeam: activeTeamState;
  stats: statsState;
  league: leagueState;
  transfers: transfersState;
  admin: adminState;
}

const rootReducer = combineReducers<State>({
	account,
	activeTeam,
	stats,
	league,
	transfers,
	admin,
	form: formReducer
} as any);
export default rootReducer;
