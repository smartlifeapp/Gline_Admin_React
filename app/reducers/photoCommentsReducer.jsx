import {
  UNAUTH_ADMIN,
  ADD_PHOTO_COMMENTS,
  ADD_PHOTO_COMMENTS_ERROR,
  UPDATE_PHOTOS_COMMENTS_META,
  ADD_PHOTO_COMMENT,
  ADD_PHOTO_COMMENT_ERROR,
  DELETE_PHOTO_COMMENT,
  DELETE_PHOTO_COMMENTS_SUCCESS_ERROR,
} from 'actionTypes';

export const photoCommentsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_PHOTO_COMMENT:
      return { ...state, ...action.payload };
    case ADD_PHOTO_COMMENT_ERROR:
      return { ...initialValues, ...action.payload };
    case UPDATE_PHOTOS_COMMENTS_META:
      return Object.assign({}, state, { itemsMeta: action.payload });
    case DELETE_PHOTO_COMMENT:
      return { ...state, item: {} };
    case ADD_PHOTO_COMMENTS:
      return { ...state, ...action.payload };
    case ADD_PHOTO_COMMENTS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_PHOTO_COMMENTS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
