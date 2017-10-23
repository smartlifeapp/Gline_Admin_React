import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_VIDEO_CHAT_LOG,
  ADD_VIDEO_CHAT_LOG_ERROR,
  UPDATE_VIDEO_CHAT_LOGS_META,
  ADD_VIDEO_CHAT_LOGS,
  ADD_VIDEO_CHAT_LOGS_ERROR,
  DELETE_VIDEO_CHAT_LOG,
  DELETE_VIDEO_CHAT_LOGS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
} from 'actionTypes';

export function setVideoChatLog(user) {
  return (dispatch) => {
    dispatch({ type: ADD_VIDEO_CHAT_LOG, payload: { item: user } });
  };
}

export function unsetVideoChatLog() {
  return (dispatch) => {
    dispatch({ type: DELETE_VIDEO_CHAT_LOG });
  };
}

export function getVideoChatLog(id) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/videoChatLog/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_VIDEO_CHAT_LOG, payload: { item: res.data.resData } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_VIDEO_CHAT_LOG_ERROR, error, dispatch));
  };
}

export function updateVideoChatLog(id, updateValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/videoChatLog/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: ADD_VIDEO_CHAT_LOG, payload: { item: res.data.resData } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_VIDEO_CHAT_LOG_ERROR, error, dispatch));
  };
}

export function deleteVideoChatLog() {
  return (dispatch) => {
    dispatch({ type: DELETE_VIDEO_CHAT_LOG });
  };
}

export function getVideoChatLogs(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = Object.assign(baseURL, authHeaders(getState().auth), parseQuery(dateField, nextMeta));
    console.log('config', config);
    axios.get(
      `/videoChatLogs${parseParams(getState().videoChatLogs.itemsMeta, nextMeta)}`,
      config)
      .then((res) => {
        dispatch({ type: ADD_VIDEO_CHAT_LOGS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_VIDEO_CHAT_LOGS_ERROR, error, dispatch));
  };
}

export const updateVideoChatLogsMeta = payload => (dispatch) => {
  dispatch({ type: UPDATE_VIDEO_CHAT_LOGS_META, payload });
};

export function dismissVideoChatLogsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_VIDEO_CHAT_LOGS_SUCCESS_ERROR });
  };
}
