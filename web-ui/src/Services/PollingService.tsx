import { call, put, take, race } from 'redux-saga/effects';
import { ActionTypes as PollActionTypes } from '../Actions/PollActions';
import {
  latestTransactionsRequest,
  latestTransactionsSuccess,
  latestTransactionsFailure
} from '../Actions/TransactionActions';
import { getLatestTransactions } from '../Services/UserService';

const delay = (duration: number) => {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
  return promise;
};

function* pollLatestTransactions() {
  while (true) {
    try {
      yield put(latestTransactionsRequest());
      const transactions = yield call(getLatestTransactions);
      yield put(latestTransactionsSuccess(transactions));
    } catch (e) {
      yield put(latestTransactionsFailure(e.message));
    } finally {
      yield call(delay, 30000);
    }
  }
}

// Saga watcher
export function* pollSagaWatcher() {
  while (true) {
    yield take(PollActionTypes.START_POLLING);
    yield race({
      poll: call(pollLatestTransactions),
      cancel: take(PollActionTypes.STOP_POLLING)
    });
  }
}
