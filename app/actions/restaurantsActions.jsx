import axios from 'axios';
import { axiosConfig, handleError } from 'serverHelper';
import {
  // restaurants
  ADD_RESTAURANT,
  ADD_RESTAURANTS,
  RESET_RESTAURANTS_META,
  // global
  START_LOADING,
  STOP_LOADING,
  COMMON_ERROR,
  OPEN_MODAL,
} from 'actionTypes';

export const setRestaurant = (payload, callback = () => {}) => (dispatch) => {
  dispatch({ type: ADD_RESTAURANT, payload });
  callback();
};

export const unsetRestaurant = () => dispatch => dispatch({ type: ADD_RESTAURANT, payload: {} });

export const getRestaurant = uid => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/property/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.get(route, config);
    dispatch({ type: ADD_RESTAURANT, payload: resData });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const updateRestaurant = (uid, form) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/property/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resMessage, resData } } = await axios.put(route, form, config);
    dispatch({ type: ADD_RESTAURANT, payload: resData });
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const getRestaurants = (nextMeta, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = '/properties/restaurant';
    const stateMeta = getState().restaurants.itemsMeta;
    const config = axiosConfig(getState, stateMeta, nextMeta);
    const { data: { resMessage, resMeta, resData } } = await axios.get(route, config);
    dispatch({ type: ADD_RESTAURANTS, payload: { items: resData, itemsMeta: resMeta } });
    if (resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback(resData);
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const resetRestaurantsMeta = (callback = () => {}) => (dispatch) => {
  dispatch({ type: RESET_RESTAURANTS_META });
  callback();
};
