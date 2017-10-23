import {
  UNAUTH_ADMIN,
  ADD_CASHOUT_REQUESTS,
  ADD_CASHOUT_REQUESTS_ERROR,
  UPDATE_CASHOUT_REQUESTS_META,
  ADD_CASHOUT_REQUEST,
  ADD_CASHOUT_REQUEST_ERROR,
  DELETE_CASHOUT_REQUEST,
  DELETE_CASHOUT_REQUESTS_SUCCESS_ERROR,
} from 'actionTypes';

export const cashoutRequestsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_CASHOUT_REQUEST:
      return { ...state, ...action.payload };
    case ADD_CASHOUT_REQUEST_ERROR:
      return { ...initialValues, ...action.payload };
    case UPDATE_CASHOUT_REQUESTS_META:
      return Object.assign({}, state, { itemsMeta: action.payload });
    case DELETE_CASHOUT_REQUEST:
      return { ...state, item: {} };
    case ADD_CASHOUT_REQUESTS:
      return { ...state, ...action.payload };
    case ADD_CASHOUT_REQUESTS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_CASHOUT_REQUESTS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
