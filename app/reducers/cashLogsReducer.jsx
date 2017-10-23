import {
  UNAUTH_ADMIN,
  ADD_CASH_LOGS,
  ADD_CASH_LOGS_ERROR,
  UPDATE_CASH_LOGS_META,
  ADD_CASH_LOG,
  ADD_CASH_LOG_ERROR,
  DELETE_CASH_LOG,
  DELETE_CASH_LOGS_SUCCESS_ERROR,
} from 'actionTypes';

export const cashLogsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_CASH_LOG:
      return { ...state, ...action.payload };
    case ADD_CASH_LOG_ERROR:
      return { ...initialValues, ...action.payload };
    case UPDATE_CASH_LOGS_META:
      return Object.assign({}, state, { itemsMeta: action.payload });
    case DELETE_CASH_LOG:
      return { ...state, item: {} };
    case ADD_CASH_LOGS:
      return { ...state, ...action.payload };
    case ADD_CASH_LOGS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_CASH_LOGS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
