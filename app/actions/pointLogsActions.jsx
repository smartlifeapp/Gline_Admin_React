import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_POINT_LOGS,
  ADD_POINT_LOGS_ERROR,
  UPDATE_POINT_LOGS_META,
  ADD_POINT_LOG,
  ADD_POINT_LOG_ERROR,
  DELETE_POINT_LOG,
  DELETE_POINT_LOGS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  ADD_USER,
  OPEN_MODAL,
} from 'actionTypes';

export function setPointLog(item) {
  return (dispatch) => {
    dispatch({ type: ADD_POINT_LOG, payload: { item } });
  };
}

export function unsetPointLog() {
  return (dispatch) => {
    dispatch({ type: DELETE_POINT_LOG });
  };
}

export function postPointLog(id, postValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.post(`/pointLog/${id}`, postValues, config)
      .then((res) => {
        dispatch({ type: ADD_USER, payload: { item: res.data.resData.user } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_POINT_LOG_ERROR, error, dispatch));
  };
}

export function getPointLog(id) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/pointLog/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_POINT_LOG, payload: { item: res.data.resData } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_POINT_LOG_ERROR, error, dispatch));
  };
}

export function updatePointLog(id, updateValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/pointLog/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: ADD_POINT_LOG, payload: { item: res.data.resData } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_POINT_LOG_ERROR, error, dispatch));
  };
}

export function deletePointLog() {
  return (dispatch) => {
    dispatch({ type: DELETE_POINT_LOG });
  };
}

export function getPointLogs(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = Object.assign(baseURL, authHeaders(getState().auth), parseQuery(dateField, nextMeta));
    console.log('config', config);
    axios.get(
      `/pointLogs${parseParams(getState().pointLogs.itemsMeta, nextMeta)}`,
      config)
      .then((res) => {
        dispatch({ type: ADD_POINT_LOGS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_POINT_LOGS_ERROR, error, dispatch));
  };
}

export const updatePointLogsMeta = payload => (dispatch) => {
  dispatch({ type: UPDATE_POINT_LOGS_META, payload });
};

export function dismissPointLogsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_POINT_LOGS_SUCCESS_ERROR });
  };
}
