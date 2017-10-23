import {
  UNAUTH_ADMIN,
  ADD_POINT_LOGS,
  ADD_POINT_LOGS_ERROR,
  UPDATE_POINT_LOGS_META,
  ADD_POINT_LOG,
  ADD_POINT_LOG_ERROR,
  DELETE_POINT_LOG,
  DELETE_POINT_LOGS_SUCCESS_ERROR,
} from 'actionTypes';

export const pointLogsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_POINT_LOG:
      return { ...state, ...action.payload };
    case ADD_POINT_LOG_ERROR:
      return { ...initialValues, ...action.payload };
    case UPDATE_POINT_LOGS_META:
      return Object.assign({}, state, { itemsMeta: action.payload });
    case DELETE_POINT_LOG:
      return { ...state, item: {} };
    case ADD_POINT_LOGS:
      return { ...state, ...action.payload };
    case ADD_POINT_LOGS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_POINT_LOGS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
