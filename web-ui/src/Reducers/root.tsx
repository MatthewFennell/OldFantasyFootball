import { combineReducers } from 'redux';
import { reducer as account, State as AccountState } from './Account';
import { reducer as activeTeam, State as activeTeamState } from './ActiveTeam';
import { reducer as formReducer, FormReducer } from 'redux-form';

export interface State {
  account: AccountState;
  formReducer: FormReducer;
  activeTeam: activeTeamState;
}

const rootReducer = combineReducers<State>({
  account,
  activeTeam,
  form: formReducer
} as any);
export default rootReducer;
