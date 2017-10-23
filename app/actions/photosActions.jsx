import axios from 'axios';
import { baseURL, authHeaders, parseParams, parseQuery } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  ADD_PHOTO,
  ADD_PHOTO_ERROR,
  DELETE_PHOTO,
  ADD_PHOTOS,
  ADD_PHOTOS_ERROR,
  UPDATE_PHOTOS_META,
  DELETE_PHOTOS_SUCCESS_ERROR,
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
} from 'actionTypes';

export function setPhoto(item) {
  return (dispatch) => {
    dispatch({ type: ADD_PHOTO, payload: { item } });
  };
}

export function unsetPhoto() {
  return (dispatch) => {
    dispatch({ type: DELETE_PHOTO });
  };
}

export function getPhoto(id) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.get(`/photo/${id}`, config)
      .then((res) => {
        dispatch({ type: ADD_PHOTO, payload: { item: res.data.resData } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_PHOTO_ERROR, error, dispatch));
  };
}

export function updatePhoto(id, updateValues) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth) };
    axios.put(`/photo/${id}`, updateValues, config)
      .then((res) => {
        dispatch({ type: ADD_PHOTO, payload: { item: res.data.resData } });
        dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_PHOTO_ERROR, error, dispatch));
  };
}

export function deletePhoto() {
  return (dispatch) => {
    dispatch({ type: DELETE_PHOTO });
  };
}

export function getPhotos(nextMeta, dateField) {
  return (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const config = { ...baseURL, ...authHeaders(getState().auth), ...parseQuery(dateField, nextMeta) };
    axios.get(`/photos${parseParams(getState().photos.itemsMeta, nextMeta)}`, config)
      .then((res) => {
        dispatch({ type: ADD_PHOTOS, payload: { items: res.data.resData, itemsMeta: res.data.resMeta } });
        if (res.data.resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: res.data.resMessage } });
        dispatch({ type: STOP_LOADING });
      })
      .catch(error => handleError(ADD_PHOTOS_ERROR, error, dispatch));
  };
}

export const updatePhotosMeta = payload => (dispatch) => {
  dispatch({ type: UPDATE_PHOTOS_META, payload });
};

export function dismissPhotosModal() {
  return (dispatch) => {
    dispatch({ type: DELETE_PHOTOS_SUCCESS_ERROR });
  };
}
