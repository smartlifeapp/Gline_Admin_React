import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';

import actions from 'actions';
import AppRouter from 'appRouter';

const socket = require('socket.io-client')(process.env.ROOT_URL);
const store = require('configureStore').configure();
const history = require('configureStore').history;
require('applicationStyles');


// require('foundation.min.css');
// Load foundation
// require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
// $(document).foundation();


// App css
// require('style-loader!css-loader!sass-loader!applicationStyles');

socket.on('connect', () => {
  console.log('connected');
});

socket.on('event', (data) => {
  console.log(data);
});

socket.on('disconnect', () => {
  console.log('disconnected');
});

// auto-login
if (localStorage.getItem('Gline_admin_auth')) {
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
  document.getElementById('app'),
);
