import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_USER_UPDATE_LOG,
  ADD_USER_UPDATE_LOG_ERROR,
  DELETE_USER_UPDATE_LOG,
  ADD_USER_UPDATE_LOGS,
  ADD_USER_UPDATE_LOGS_ERROR,
  DELETE_USER_UPDATE_LOGS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
} from 'actionTypes';

export function getUserUpdateLog(id) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/userUpdateLog/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_USER_UPDATE_LOG, payload: { item: res.data.resData } });
      })
      .catch(error => handleError(ADD_USER_UPDATE_LOG_ERROR, error, dispatch));
  };
}

export function deleteUserUpdateLog() {
  return (dispatch) => {
    dispatch({ type: DELETE_USER_UPDATE_LOG });
  };
}

export function getUserUpdateLogs(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta, 'userUpdateLogs') };
    axios.get(`/userUpdateLogs${parseParams(getState().userUpdateLogs.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_USER_UPDATE_LOGS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_USER_UPDATE_LOGS_ERROR, error, dispatch));
  };
}

export function dismissUserUpdateLogsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_USER_UPDATE_LOGS_SUCCESS_ERROR });
  };
}
