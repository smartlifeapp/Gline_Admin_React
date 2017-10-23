import {
  UNAUTH_ADMIN,
  ADD_USER_UPDATE_LOGS,
  ADD_USER_UPDATE_LOGS_ERROR,
  ADD_USER_UPDATE_LOG,
  ADD_USER_UPDATE_LOG_ERROR,
  DELETE_USER_UPDATE_LOG,
  DELETE_USER_UPDATE_LOGS_SUCCESS_ERROR,
} from 'actionTypes';

export const userUpdateLogsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_USER_UPDATE_LOG:
      return { ...state, ...action.payload };
    case ADD_USER_UPDATE_LOG_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_USER_UPDATE_LOG:
      return { ...state, item: {} };
    case ADD_USER_UPDATE_LOGS:
      return { ...state, ...action.payload };
    case ADD_USER_UPDATE_LOGS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_USER_UPDATE_LOGS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
