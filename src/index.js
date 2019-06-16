import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import 'bootstrap/dist/css/bootstrap.min.css';

import './micalendar.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/configure_store';
import theRoutes from './router/routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={ history }>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App>{theRoutes}</App>
      </React.Suspense>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
