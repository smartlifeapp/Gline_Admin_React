import {
  UNAUTH_ADMIN,
  ADD_TALKS,
  ADD_TALKS_ERROR,
  ADD_TALK,
  ADD_TALK_ERROR,
  UPDATE_TALKS_META,
  DELETE_TALK,
  DELETE_TALKS_SUCCESS_ERROR,
} from 'actionTypes';

export const talksReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_TALK:
      return { ...state, ...action.payload };
    case ADD_TALK_ERROR:
      return { ...initialValues, ...action.payload };
    case UPDATE_TALKS_META:
      return Object.assign({}, state, { itemsMeta: action.payload });
    case DELETE_TALK:
      return { ...state, item: {} };
    case ADD_TALKS:
      return { ...state, ...action.payload };
    case ADD_TALKS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_TALKS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
