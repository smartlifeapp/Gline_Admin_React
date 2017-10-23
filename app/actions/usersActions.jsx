import axios from 'axios';
import { axiosConfig, handleError } from 'serverHelper';
import {
  // users
  ADD_USER,
  ADD_USERS,
  RESET_USERS_META,
  // global
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
  COMMON_ERROR,
} from 'actionTypes';

export const setUser = (payload, callback = () => {}) => (dispatch) => {
  dispatch({ type: ADD_USER, payload });
  callback();
};

export const unsetUser = () => dispatch => dispatch({ type: ADD_USER, payload: { item: {} } });

export const getUser = (uid, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/user/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.get(route, config);
    dispatch({ type: ADD_USER, payload: resData });
    dispatch({ type: STOP_LOADING });
    callback(resData);
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putUser = ({ id, updateForm }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/user/${id}`;
    const config = axiosConfig(getState);
    const { data: { resMessage, resData } } = await axios.put(route, updateForm, config);
    dispatch({ type: ADD_USER, payload: resData });
    dispatch({ type: STOP_LOADING });
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    callback(resData);
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const getUsers = (nextMeta, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = '/users';
    const stateMeta = getState().users.itemsMeta;
    const config = axiosConfig(getState, stateMeta, nextMeta);
    const { data: { resMessage, resMeta, resData } } = await axios.get(route, config);
    dispatch({ type: ADD_USERS, payload: { items: resData, itemsMeta: resMeta } });
    if (resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback(resData);
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const resetUsersMeta = (callback = () => {}) => (dispatch) => {
  dispatch({ type: RESET_USERS_META });
  callback();
};
