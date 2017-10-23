import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_ADMIN_MESSAGE,
  ADD_ADMIN_MESSAGE_ERROR,
  ADD_ADMIN_MESSAGES,
  ADD_ADMIN_MESSAGES_ERROR,
  DELETE_ADMIN_MESSAGE,
  DELETE_ADMIN_MESSAGES_SUCCESS_ERROR,
} from 'actionTypes';

export function setAdminMessage(item) {
  return (dispatch) => {
    dispatch({ type: ADD_ADMIN_MESSAGE, payload: { item } });
  };
}

export function unsetAdminMessage() {
  return (dispatch) => {
    dispatch({ type: DELETE_ADMIN_MESSAGE });
  };
}

export function postAdminMessage(word) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.post('/adminMessage', { word }, config)
    .then((res) => {
      dispatch({ type: ADD_ADMIN_MESSAGE, payload: { item: res.data.resData, success: res.data.resMessage } });
    })
    .catch(error => handleError(ADD_ADMIN_MESSAGE_ERROR, error, dispatch));
  };
}

export function getAdminMessage(id) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/adminMessage/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_ADMIN_MESSAGE, payload: { item: res.data.resData } });
      })
      .catch(error => handleError(ADD_ADMIN_MESSAGE_ERROR, error, dispatch));
  };
}

export function deleteAdminMessage() {
  return (dispatch) => {
    dispatch({ type: DELETE_ADMIN_MESSAGE });
  };
}

export function getAdminMessages(nextMeta, dateField) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(`/adminMessages${parseParams(getState().adminMessages.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_ADMIN_MESSAGES, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
      })
      .catch(error => handleError(ADD_ADMIN_MESSAGES_ERROR, error, dispatch));
  };
}

export function dismissAdminMessagesModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_ADMIN_MESSAGES_SUCCESS_ERROR });
  };
}
