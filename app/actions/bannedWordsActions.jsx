import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  POST_BANNED_WORD,
  POST_BANNED_WORD_ERROR,
  ADD_BANNED_WORD,
  ADD_BANNED_WORD_ERROR,
  DELETE_BANNED_WORD_AT,
  UPDATE_BANNED_WORD_AT,
  ADD_BANNED_WORDS,
  ADD_BANNED_WORDS_ERROR,
  DELETE_BANNED_WORDS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
} from 'actionTypes';

export function postBannedWord(word) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.post('/bannedWord', { word }, config)
    .then((res) => {
      dispatch({ type: POST_BANNED_WORD, payload: { item: res.data.resData, success: res.data.resMessage } });
    })
    .catch(error => handleError(POST_BANNED_WORD_ERROR, error, dispatch));
  };
}

export function updateBannedWord(id, updateValues, index) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/bannedWord/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: UPDATE_BANNED_WORD_AT, index, payload: res.data.resData });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
      })
      .catch(error => handleError(POST_BANNED_WORD_ERROR, error, dispatch));
  };
}

export function getBannedWord(id) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/bannedWord/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_BANNED_WORD, payload: { item: res.data.resData } });
      })
      .catch(error => handleError(ADD_BANNED_WORD_ERROR, error, dispatch));
  };
}

export function deleteBannedWord(id, index) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.delete(`/bannedWord/${id}`, config)
      .then((res) => {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: DELETE_BANNED_WORD_AT, payload: index });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
      })
      .catch(error => handleError(ADD_BANNED_WORD_ERROR, error, dispatch));
  };
}

export function getBannedWords(nextMeta, dateField) {
  return (dispatch, getState) => {
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(`/bannedWords${parseParams(getState().bannedWords.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_BANNED_WORDS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
      })
      .catch(error => handleError(ADD_BANNED_WORDS_ERROR, error, dispatch));
  };
}

export function dismissBannedWordsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_BANNED_WORDS_SUCCESS_ERROR });
  };
}
