import axios from 'axios';
import { push } from 'react-router-redux';
import { resizeImage } from 'formatHelper';
import { axiosConfig, handleError } from 'serverHelper';
import {
  TOGGLE_MENU,
  TOGGLE_FILTER,
  START_UPLOADING,
  STOP_UPLOADING,
  START_LOADING,
  STOP_LOADING,
  COMMON_ERROR,
} from 'actionTypes';

export function toggleMenu() {
  return (dispatch) => {
    dispatch({ type: TOGGLE_MENU });
  };
}

export function toggleFilter() {
  return (dispatch) => {
    dispatch({ type: TOGGLE_FILTER });
  };
}

export const pushRoute = nextRoute => (dispatch) => {
  dispatch(push(nextRoute));
};

export const uploadImage = (file, callback) => (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  dispatch({ type: START_UPLOADING });
  try {
    const config = axiosConfig(getState);
    const data = new FormData();
    resizeImage(file, 1920, 1920, async (result) => {
      const { resizedImage, width, height } = result;
      data.append('image', resizedImage);
      const { data: { resData: { photoUrl } } } = await axios.post('/helper/imageUploader', data, config);
      dispatch({ type: STOP_LOADING });
      dispatch({ type: STOP_UPLOADING });
      callback({ photoUrl, width, height, ratio: width / height });
    });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};
