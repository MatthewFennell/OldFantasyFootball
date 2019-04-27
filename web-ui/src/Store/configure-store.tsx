import rootReducer from '../Reducers/root';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(thunk);
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}

const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), compose(applyMiddleware(...middlewares)));

export default store;
