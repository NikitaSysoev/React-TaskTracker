import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
// import { assignAll } from 'redux-act';
// import * as actions from './actions';
import createRootReducer from './reducer';

export const history = createBrowserHistory();


// const OldConfigureStore = createStore(rootReducer);


export default function configureStore(preloadedState) {
	const store = createStore(
		createRootReducer(history),
		preloadedState,
		compose(
			applyMiddleware(
				routerMiddleware(history),
				thunk,
				// ... other middlewares ...
			),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		),
	);

	// assignAll(actions, store);

	return store
}
