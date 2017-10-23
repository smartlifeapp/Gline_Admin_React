import {
  UNAUTH_ADMIN,
  ADD_PHOTOS,
  ADD_PHOTOS_ERROR,
  UPDATE_PHOTOS_META,
  ADD_PHOTO,
  ADD_PHOTO_ERROR,
  DELETE_PHOTO,
  DELETE_PHOTOS_SUCCESS_ERROR,
} from 'actionTypes';

export const photosReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_PHOTO:
      return { ...state, ...action.payload };
    case ADD_PHOTO_ERROR:
      return { ...initialValues, ...action.payload };
    case UPDATE_PHOTOS_META:
      return Object.assign({}, state, { itemsMeta: action.payload });
    case DELETE_PHOTO:
      return { ...state, item: {} };
    case ADD_PHOTOS:
      return { ...state, ...action.payload };
    case ADD_PHOTOS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_PHOTOS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
