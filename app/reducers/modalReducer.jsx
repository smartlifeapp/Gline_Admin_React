import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SAVE_MODAL,
  UPDATE_MODAL,
} from 'actionTypes';

export const modalReducer = (state, action) => {
  const initialValues = { isModalVisible: false, type: '', message: '', error: '', object: undefined, index: undefined };
  switch (action.type) {
    case CLOSE_MODAL:
      return initialValues;
    case OPEN_MODAL:
      return { ...state, isModalVisible: true, ...action.payload };
    case SAVE_MODAL:
      return { ...state, ...action.payload };
    case UPDATE_MODAL:
      return { ...state, ...action.payload };
    default:
      return state || initialValues;
  }
};
