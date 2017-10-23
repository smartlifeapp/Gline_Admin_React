import { encodeBase64 } from 'cryptHelper';
import { UNAUTH_ADMIN, STOP_LOADING, OPEN_MODAL } from 'actionTypes';
import { push } from 'react-router-redux';

export const handleError = (actionType, error, dispatch) => {
  dispatch({ type: STOP_LOADING });
  console.log('error', error);
  if (!error.response) {
    dispatch({ type: OPEN_MODAL, payload: { type: 'error', message: 'Server not responding...' } });
    dispatch({ type: actionType });
    return;
  }
  switch (error.response.data.resCode) {
    case 401:
      localStorage.removeItem('seolreim_admin_auth');
      dispatch(push('/login'));
      dispatch({ type: UNAUTH_ADMIN, payload: { error: error.response.data.resMessage } });
      return;
    case 404:
      dispatch({ type: OPEN_MODAL, payload: { type: 'error', message: error.response.data.resMessage } });
      dispatch({ type: actionType });
      return;
    default:
      if (error.response.data.resMessage) {
        dispatch({ type: OPEN_MODAL, payload: { type: 'error', message: error.response.data.resMessage } });
        dispatch({ type: actionType });
        return;
      }
      dispatch({ type: OPEN_MODAL, payload: { type: 'error', message: error.response.data } });
  }
};

export const axiosConfig = (getState, stateMeta = {}, nextMeta = {}) => {
  // auth header
  const headers = authHeaders(getState().auth);
  // query params
  // search
  const userId = nextMeta.userId || stateMeta.userId;
  const email = nextMeta.email || stateMeta.email;
  const nickname = nextMeta.nickname || stateMeta.nickname;
  const gender = nextMeta.gender || stateMeta.gender;
  const nameAndTitle = nextMeta.nameAndTitle || stateMeta.nameAndTitle;
  const startDate = nextMeta.startDate || stateMeta.startDate;
  const endDate = nextMeta.endDate || stateMeta.endDate;
  const searchParams = Object.assign({},
    nameAndTitle && { nameAndTitle: encodeURIComponent(nameAndTitle) },
    userId && { userId: encodeURIComponent(userId) },
    email && { email: encodeURIComponent(email) },
    nickname && { nickname: encodeURIComponent(nickname) },
    gender && gender !== 'all' && { gender: encodeURIComponent(gender) },
    startDate && { startDate: encodeURIComponent(startDate) },
    endDate && { endDate: encodeURIComponent(endDate) },
  );
  // basic
  const basicParams = {
    orderBy: nextMeta.orderBy || stateMeta.orderBy || 'id',
    orderDirection: nextMeta.orderDirection || stateMeta.orderDirection || 'DESC',
    page: nextMeta.page || stateMeta.page || 1,
    limit: nextMeta.limit || stateMeta.limit || 30,
  };
  const params = Object.assign({}, basicParams, searchParams);
  return Object.assign({},
    { baseURL: process.env.ROOT_URL },
    headers,
    { params },
  );
};

export const authHeaders = (stateAuth = {}) => {
  let localAuth = localStorage.getItem('findball_admin_auth');
  if (localAuth) localAuth = JSON.parse(localAuth);
  let loginToken = 'undefined';
  if (stateAuth && stateAuth.loginToken) loginToken = stateAuth.loginToken;
  if (localAuth && localAuth.loginToken) loginToken = localAuth.loginToken;
  return {
    headers: { 'Admin-Token': loginToken },
  };
};
