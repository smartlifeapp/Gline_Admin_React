import {
  UNAUTH_ADMIN,
  ADD_VIDEO_CHAT_LOGS,
  ADD_VIDEO_CHAT_LOGS_ERROR,
  UPDATE_VIDEO_CHAT_LOGS_META,
  ADD_VIDEO_CHAT_LOG,
  ADD_VIDEO_CHAT_LOG_ERROR,
  DELETE_VIDEO_CHAT_LOG,
  DELETE_VIDEO_CHAT_LOGS_SUCCESS_ERROR,
} from 'actionTypes';

export const videoChatLogsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {}, success: '', error: '' };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_VIDEO_CHAT_LOG:
      return { ...state, ...action.payload };
    case ADD_VIDEO_CHAT_LOG_ERROR:
      return { ...initialValues, ...action.payload };
    case UPDATE_VIDEO_CHAT_LOGS_META:
      return Object.assign({}, state, { itemsMeta: action.payload });
    case DELETE_VIDEO_CHAT_LOG:
      return { ...state, item: {} };
    case ADD_VIDEO_CHAT_LOGS:
      return { ...state, ...action.payload };
    case ADD_VIDEO_CHAT_LOGS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_VIDEO_CHAT_LOGS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
