import * as redux from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { adminMessagesReducer } from 'adminMessagesReducer';
import { adminsReducer } from 'adminsReducer';
import { authReducer } from 'authReducer';
import { bannedWordsReducer } from 'bannedWordsReducer';
import { cashLogsReducer } from 'cashLogsReducer';
import { cashoutRequestsReducer } from 'cashoutRequestsReducer';
import groupChats from 'groupChatsReducer';
import properties from 'propertiesReducer';
import { metaReducer } from 'metaReducer';
import { modalReducer } from 'modalReducer';
import { moduleReducer } from 'moduleReducer';
import { photosReducer } from 'photosReducer';
import { photoCommentsReducer } from 'photoCommentsReducer';
import { pointLogsReducer } from 'pointLogsReducer';
import { purchaseLogsReducer } from 'purchaseLogsReducer';
import { statsReducer } from 'statsReducer';
import { talksReducer } from 'talksReducer';
import users from 'usersReducer';
import { userUpdateLogsReducer } from 'userUpdateLogsReducer';
import restaurants from 'restaurantsReducer';
import accommodations from 'accommodationsReducer';

export const history = createHistory();
const middleware = routerMiddleware(history);

export const configure = (initialState = {}) => {
  const reducer = redux.combineReducers({
    accommodations,
    adminMessages: adminMessagesReducer,
    admins: adminsReducer,
    auth: authReducer,
    bannedWords: bannedWordsReducer,
    cashLogs: cashLogsReducer,
    cashoutRequests: cashoutRequestsReducer,
    form: formReducer,
    groupChats,
    meta: metaReducer,
    modal: modalReducer,
    module: moduleReducer,
    photos: photosReducer,
    photoComments: photoCommentsReducer,
    pointLogs: pointLogsReducer,
    properties,
    purchaseLogs: purchaseLogsReducer,
    restaurants,
    stats: statsReducer,
    talks: talksReducer,
    router: routerReducer,
    users,
    userUpdateLogs: userUpdateLogsReducer,
  });

  const store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));

  return store;
};
