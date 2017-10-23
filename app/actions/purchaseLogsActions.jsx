import axios from 'axios';
// import { baseURL, authHeaders } from 'httpRequestHelper';
import { axiosConfig, handleError } from 'serverHelper';
import {
  ADD_PURCHASE_LOG,
  ADD_PURCHASE_LOGS,
  RESET_PURCHASE_LOGS_META,
  START_LOADING,
  STOP_LOADING,
  OPEN_MODAL,
  COMMON_ERROR,
} from 'actionTypes';

export const setPurchaseLog = (payload, callback = () => {}) => (dispatch) => {
  dispatch({ type: ADD_PURCHASE_LOG, payload });
  callback();
};

export const unsetPurchaseLog = () => dispatch => dispatch({ type: ADD_PURCHASE_LOG, payload: {} });

export const getPurchaseLog = uid => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/purchaseLog/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.get(route, config);
    dispatch({ type: ADD_PURCHASE_LOG, payload: resData });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putPurchaseLog = ({ uid, form }) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/purchaseLog/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resMessage, resData } } = await axios.put(route, form, config);
    dispatch({ type: ADD_PURCHASE_LOG, payload: resData });
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putPurchaseLogWithMethod = ({ uid, method }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/purchaseLog/${uid}/${method}`;
    const config = axiosConfig(getState);
    const { data: { resMessage } } = await axios.put(route, {}, config);
    // dispatch({ type: ADD_PURCHASE_LOG, payload: resData });
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const getPurchaseLogs = nextMeta => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = '/purchaseLogs';
    const stateMeta = getState().purchaseLogs.itemsMeta;
    const config = axiosConfig(getState, stateMeta, nextMeta);
    const { data: { resMessage, resMeta, resData } } = await axios.get(route, config);
    dispatch({ type: ADD_PURCHASE_LOGS, payload: { items: resData, itemsMeta: resMeta } });
    if (resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const resetPurchaseLogsMeta = (callback = () => {}) => (dispatch) => {
  dispatch({ type: RESET_PURCHASE_LOGS_META });
  callback();
};
