import axios from 'axios';
import { baseURL, authHeaders } from 'httpRequestHelper';
import { handleError } from 'actionHelpers';
import {
  COMMON_ERROR,
  // ADD_STATS,
  UPDATE_STATS,
  START_LOADING,
  STOP_LOADING,
} from 'actionTypes';

export const getStats = () => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const { data: { resData } } = await axios.get('/storys', Object.assign({}, authHeaders(getState().auth), baseURL));
    console.log(data);
    dispatch({ type: UPDATE_STATS, payload: resData });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};
