import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import actions from 'actions';
import AppRouter from 'AppRouter';
var store = require('configureStore').configure();
var history = require('configureStore').history;
require('applicationStyles');

// Load foundation
// require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();

// App css
// require('style-loader!css-loader!sass-loader!applicationStyles');

// auto-login
if (localStorage.getItem('seolreim_admin_auth')) {
  store.dispatch(actions.loginWithToken());
} else {
  store.dispatch(push('/login'));
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
