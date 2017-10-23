import axios from 'axios';
import { axiosConfig, handleError } from 'serverHelper';
import {
  // accommodations
  ADD_ACCOMMODATION,
  ADD_ACCOMMODATIONS,
  // accommodationsMeta
  RESET_ACCOMMODATIONS_META,
  // global
  START_LOADING,
  STOP_LOADING,
  COMMON_ERROR,
  // modal
  OPEN_MODAL,
} from 'actionTypes';

export const setAccommodation = payload => dispatch => dispatch({ type: ADD_ACCOMMODATION, payload });

export const unsetAccommodation = () => dispatch => dispatch({ type: ADD_ACCOMMODATION, payload: {} });

export const getAccommodation = uid => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/property/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.get(route, config);
    dispatch({ type: ADD_ACCOMMODATION, payload: resData });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};
export const updateAccommodation = (uid, form) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/property/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resMessage, resData } } = await axios.put(route, form, config);
    dispatch({ type: ADD_ACCOMMODATION, payload: resData });
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};
export const getAccommodations = nextMeta => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = '/properties/accommodation';
    const stateMeta = getState().restaurants.itemsMeta;
    const config = axiosConfig(getState, stateMeta, nextMeta);
    const { data: { resMessage, resMeta, resData } } = await axios.get(route, config);
    dispatch({ type: ADD_ACCOMMODATIONS, payload: { items: resData, itemsMeta: resMeta } });
    if (resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};
export const updateAccommodationsMeta = callback => (dispatch) => {
  dispatch({ type: RESET_ACCOMMODATIONS_META });
  callback();
};
