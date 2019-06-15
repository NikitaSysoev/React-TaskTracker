import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
// import { assignAll } from 'redux-act';
// import * as actions from './actions';
import { deleteMiddleware } from './middleware';
import createRootReducer from './reducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
		routerMiddleware(history),	
		thunk,
		deleteMiddleware,
        // ... other middlewares ...
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  // assignAll(actions, store);

  return store;
}
