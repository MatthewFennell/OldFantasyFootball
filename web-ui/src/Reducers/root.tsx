import { combineReducers } from 'redux';
import { reducer as account, State as AccountState } from './Account';
import { reducer as activeTeam, State as activeTeamState } from './ActiveTeam';
import { reducer as stats, State as statsState } from './Stats';
import { reducer as league, State as leagueState } from './League';
import { reducer as formReducer, FormReducer } from 'redux-form';

export interface State {
  account: AccountState;
  formReducer: FormReducer;
  activeTeam: activeTeamState;
  stats: statsState;
  league: leagueState;
}

const rootReducer = combineReducers<State>({
  account,
  activeTeam,
  stats,
  league,
  form: formReducer
} as any);
export default rootReducer;
