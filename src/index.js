import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Loader from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import './micalendar.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/configure_store';
import theRoutes from './router/routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Suspense fallback={<Loader type="Puff" color="#00BFFF" height="100" width="100" />}>
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
