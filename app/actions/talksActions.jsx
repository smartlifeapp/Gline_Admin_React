import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_TALK,
  ADD_TALK_ERROR,
  DELETE_TALK,
  ADD_TALKS,
  ADD_TALKS_ERROR,
  UPDATE_TALKS_META,
  DELETE_TALKS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
} from 'actionTypes';

export function setTalk(item) {
  return (dispatch) => {
    dispatch({ type: ADD_TALK, payload: { item } });
  };
}

export function unsetTalk() {
  return (dispatch) => {
    dispatch({ type: DELETE_TALK });
  };
}

export function getTalk(id) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/talk/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_TALK, payload: { item: res.data.resData } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_TALK_ERROR, error, dispatch));
  };
}

export function updateTalk(id, updateValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/talk/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: ADD_TALK, payload: { item: res.data.resData } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_TALK_ERROR, error, dispatch));
  };
}

export function deleteTalk() {
  return (dispatch) => {
    dispatch({ type: DELETE_TALK });
  };
}

export function getTalks(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(`/talks${parseParams(getState().talks.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_TALKS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_TALKS_ERROR, error, dispatch));
  };
}

export const updateTalksMeta = payload => (dispatch) => {
  dispatch({ type: UPDATE_TALKS_META, payload });
};

export function dismissTalksModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_TALKS_SUCCESS_ERROR });
  };
}
