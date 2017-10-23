import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_ADMIN,
  ADD_ADMIN_ERROR,
  DELETE_ADMIN,
  ADD_ADMINS,
  ADD_ADMINS_ERROR,
  DELETE_ADMINS_SUCCESS_ERROR,
} from 'actionTypes';

export function postAdmin(word) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.post('/admin', { word }, config)
    .then((res) => {
      dispatch({ type: ADD_ADMIN, payload: { item: res.data.resData, success: res.data.resMessage } });
    })
    .catch(error => handleError(ADD_ADMIN_ERROR, error, dispatch));
  };
}

export function getAdmin(id) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/admin/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_ADMIN, payload: { item: res.data.resData } });
      })
      .catch(error => handleError(ADD_ADMIN_ERROR, error, dispatch));
  };
}

export function deleteAdmin() {
  return (dispatch) => {
    dispatch({ type: DELETE_ADMIN });
  };
}

export function getAdmins(nextMeta, dateField) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(`/admins${parseParams(getState().admins.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_ADMINS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
      })
      .catch(error => handleError(ADD_ADMINS_ERROR, error, dispatch));
  };
}

export function dismissAdminsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_ADMINS_SUCCESS_ERROR });
  };
}
