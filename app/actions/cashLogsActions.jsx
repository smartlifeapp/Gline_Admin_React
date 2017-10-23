import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_CASH_LOG,
  ADD_CASH_LOG_ERROR,
  UPDATE_CASH_LOGS_META,
  DELETE_CASH_LOG,
  ADD_CASH_LOGS,
  ADD_CASH_LOGS_ERROR,
  DELETE_CASH_LOGS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  ADD_USER,
  OPEN_MODAL,
} from 'actionTypes';

export function setCashLog(item) {
  return (dispatch) => {
    dispatch({ type: ADD_CASH_LOG, payload: { item } });
  };
}

export function unsetCashLog() {
  return (dispatch) => {
    dispatch({ type: DELETE_CASH_LOG });
  };
}

export function postCashLog(id, postValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.post(`/cashLog/${id}`, postValues, config)
      .then((res) => {
        dispatch({ type: ADD_USER, payload: { item: res.data.resData.user } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_CASH_LOG_ERROR, error, dispatch));
  };
}

export function getCashLog(id) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/cashLog/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_CASH_LOG, payload: { item: res.data.resData } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_CASH_LOG_ERROR, error, dispatch));
  };
}

export function updateCashLog(id, updateValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/cashLog/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: ADD_CASH_LOG, payload: { item: res.data.resData } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_CASH_LOG_ERROR, error, dispatch));
  };
}

export function deleteCashLog() {
  return (dispatch) => {
    dispatch({ type: DELETE_CASH_LOG });
  };
}

export function getCashLogs(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(`/cashLogs${parseParams(getState().cashLogs.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_CASH_LOGS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_CASH_LOGS_ERROR, error, dispatch));
  };
}

export const updateCashLogsMeta = payload => (dispatch) => {
  dispatch({ type: UPDATE_CASH_LOGS_META, payload });
};

export function dismissCashLogsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_CASH_LOGS_SUCCESS_ERROR });
  };
}
