import {
  UNAUTH_ADMIN,
  ADD_ADMIN,
  ADD_ADMIN_ERROR,
  ADD_ADMINS,
  ADD_ADMINS_ERROR,
  DELETE_ADMIN,
  DELETE_ADMINS_SUCCESS_ERROR,
} from 'actionTypes';

export const adminsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    // case POST_ADMIN:
    //   return { ...initialValues, items: [action.payload.item, ...state.items], itemsMeta: state.itemsMeta };
    // case POST_ADMIN_ERROR:
    //   return { ...state, ...action.payload };
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_ADMIN:
      return { ...state, ...action.payload };
    case ADD_ADMIN_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_ADMIN:
      return { ...state, item: {} };
    case ADD_ADMINS:
      return { ...state, ...action.payload };
    case ADD_ADMINS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_ADMINS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
