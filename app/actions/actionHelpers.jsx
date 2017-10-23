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
      localStorage.removeItem('Gline_admin_auth');
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
