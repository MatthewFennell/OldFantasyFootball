import { combineReducers } from 'redux';
import { reducer as account, State as AccountState } from './Account';
import { reducer as formReducer, FormReducer } from 'redux-form';

export interface State {
  account: AccountState;
  formReducer: FormReducer;
}

const rootReducer = combineReducers<State>({
  account,
  form: formReducer
} as any);
export default rootReducer;
