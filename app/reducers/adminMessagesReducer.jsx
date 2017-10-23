import {
  UNAUTH_ADMIN,
  ADD_ADMIN_MESSAGE,
  ADD_ADMIN_MESSAGE_ERROR,
  ADD_ADMIN_MESSAGES,
  ADD_ADMIN_MESSAGES_ERROR,
  DELETE_ADMIN_MESSAGE,
  DELETE_ADMIN_MESSAGES_SUCCESS_ERROR,
} from 'actionTypes';

export const adminMessagesReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_ADMIN_MESSAGE:
      return { ...state, ...action.payload };
    case ADD_ADMIN_MESSAGE_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_ADMIN_MESSAGE:
      return { ...state, item: {} };
    case ADD_ADMIN_MESSAGES:
      return { ...state, ...action.payload };
    case ADD_ADMIN_MESSAGES_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_ADMIN_MESSAGES_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
