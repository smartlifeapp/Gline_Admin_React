import axios from 'axios';
import { axiosConfig, handleError } from 'serverHelper';
import {
  // global
  START_LOADING,
  STOP_LOADING,
  COMMON_ERROR,
  OPEN_MODAL,
  // properties
  ADD_PROPERTY,
  ADD_PROPERTIES,
  RESET_PROPERTIES_META,
} from 'actionTypes';

export const setProperty = ({ type, item }, callback = () => {}) => (dispatch) => {
  dispatch({ type: ADD_PROPERTY, payload: { type, item } });
  callback();
};

export const unsetProperty = ({ type }) => dispatch => dispatch({ type: ADD_PROPERTY, payload: { type, item: {} } });

export const getProperty = ({ type, uid }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/property/${type}/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.get(route, config);
    dispatch({ type: ADD_PROPERTY, payload: { type, item: resData } });
    dispatch({ type: STOP_LOADING });
    callback(resData);
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putProperty = ({ type, uid, updateForm }) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = { accommodation: 'property', restaurant: 'property', review: 'property', comment: 'comment', report: 'report' }[type];
    const url = `/${route}/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resMessage, resData } } = await axios.put(url, updateForm, config);
    dispatch({ type: ADD_PROPERTY, payload: { type, item: resData } });
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const getProperties = ({ type, nextMeta = {} }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/properties/${type}`;
    const stateMeta = getState().properties[`${type}sMeta`];
    const config = axiosConfig(getState, stateMeta, nextMeta);
    const { data: { resMessage, resMeta, resData } } = await axios.get(route, config);
    dispatch({ type: ADD_PROPERTIES, payload: { type, items: resData, itemsMeta: resMeta } });
    if (resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback(resData);
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const resetPropertiesMeta = ({ type }, callback = () => {}) => (dispatch) => {
  dispatch({ type: RESET_PROPERTIES_META, payload: { type } });
  callback();
};
