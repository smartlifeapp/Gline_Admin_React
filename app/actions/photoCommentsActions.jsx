import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_PHOTO_COMMENT,
  ADD_PHOTO_COMMENT_ERROR,
  UPDATE_PHOTOS_COMMENTS_META,
  DELETE_PHOTO_COMMENT,
  ADD_PHOTO_COMMENTS,
  ADD_PHOTO_COMMENTS_ERROR,
  DELETE_PHOTO_COMMENTS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
} from 'actionTypes';

export function setPhotoComment(item) {
  return (dispatch) => {
    dispatch({ type: ADD_PHOTO_COMMENT, payload: { item } });
  };
}

export function unsetPhotoComment() {
  return (dispatch) => {
    dispatch({ type: DELETE_PHOTO_COMMENT });
  };
}

export function getPhotoComment(id) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/photoComment/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_PHOTO_COMMENT, payload: { item: res.data.resData } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_PHOTO_COMMENT_ERROR, error, dispatch));
  };
}

export function deletePhotoComment() {
  return (dispatch) => {
    dispatch({ type: DELETE_PHOTO_COMMENT });
  };
}

export function updatePhotoComment(id, updateValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/photoComment/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: ADD_PHOTO_COMMENT, payload: { item: res.data.resData } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_PHOTO_COMMENT_ERROR, error, dispatch));
  };
}

export function getPhotoComments(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const request = `/photoComments${parseParams(getState().photoComments.itemsMeta, nextMeta)}`;
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(request, config)
      .then((res) => {
        dispatch({ type: ADD_PHOTO_COMMENTS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_PHOTO_COMMENTS_ERROR, error, dispatch));
  };
}

export const updatePhotoCommentsMeta = payload => (dispatch) => {
  dispatch({ type: UPDATE_PHOTOS_COMMENTS_META, payload });
};

export function dismissPhotoCommentsModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_PHOTO_COMMENTS_SUCCESS_ERROR });
  };
}
