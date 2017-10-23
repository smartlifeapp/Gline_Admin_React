import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_CASHOUT_REQUEST,
  ADD_CASHOUT_REQUEST_ERROR,
  UPDATE_CASHOUT_REQUESTS_META,
  DELETE_CASHOUT_REQUEST,
  ADD_CASHOUT_REQUESTS,
  ADD_CASHOUT_REQUESTS_ERROR,
  DELETE_CASHOUT_REQUESTS_SUCCESS_ERROR,
  OPEN_MODAL,
  START_LOADING,
  STOP_LOADING,
} from 'actionTypes';

export function setCashoutRequest(item) {
  return (dispatch) => {
    dispatch({ type: ADD_CASHOUT_REQUEST, payload: { item } });
  };
}

export function unsetCashoutRequest() {
  return (dispatch) => {
    dispatch({ type: DELETE_CASHOUT_REQUEST });
  };
}

export function getCashoutRequest(id) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/cashoutRequest/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_CASHOUT_REQUEST, payload: { item: res.data.resData } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_CASHOUT_REQUEST_ERROR, error, dispatch));
  };
}

export function updateCashoutRequest(id, updateValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/cashoutRequest/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: ADD_CASHOUT_REQUEST, payload: { item: res.data.resData, success: res.data.resMessage } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_CASHOUT_REQUESTS_ERROR, error, dispatch));
  };
}

export function deleteCashoutRequest() {
  return (dispatch) => {
    dispatch({ type: DELETE_CASHOUT_REQUEST });
  };
}

export function getCashoutRequests(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(`/cashoutRequests${parseParams(getState().cashoutRequests.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_CASHOUT_REQUESTS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_CASHOUT_REQUESTS_ERROR, error, dispatch));
  };
}

export const updateCashoutRequestsMeta = payload => (dispatch) => {
  dispatch({ type: UPDATE_CASHOUT_REQUESTS_META, payload });
};

export function dismissCashoutRequestsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_CASHOUT_REQUESTS_SUCCESS_ERROR });
  };
}
