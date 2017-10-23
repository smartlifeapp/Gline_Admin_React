import {
  UNAUTH_ADMIN,
  POST_BANNED_WORD,
  POST_BANNED_WORD_ERROR,
  ADD_BANNED_WORD,
  ADD_BANNED_WORD_ERROR,
  ADD_BANNED_WORDS,
  ADD_BANNED_WORDS_ERROR,
  DELETE_BANNED_WORD_AT,
  DELETE_BANNED_WORD,
  DELETE_BANNED_WORDS_SUCCESS_ERROR,
  UPDATE_BANNED_WORD_AT,
} from 'actionTypes';

export const bannedWordsReducer = (state, action) => {
  const initialValues = { item: {}, items: [], selectedItems: [], itemsMeta: {} };
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case POST_BANNED_WORD:
      return { ...initialValues, items: [action.payload.item, ...state.items], itemsMeta: state.itemsMeta };
    case POST_BANNED_WORD_ERROR:
      return { ...state, ...action.payload };
    case ADD_BANNED_WORD:
      return { ...state, ...action.payload };
    case DELETE_BANNED_WORD_AT:
      return { ...state, items: [...state.items.slice(0, action.payload), ...state.items.slice(action.payload + 1)] };
    case UPDATE_BANNED_WORD_AT:
      return Object.assign({}, state, { items: state.items.slice(0, action.index)
        .concat([{ ...state.items[action.index], word: action.payload.word, updatedAt: action.payload.updatedAt }])
        .concat(state.items.slice(action.index + 1)),
      });
    case ADD_BANNED_WORD_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_BANNED_WORD:
      return { ...state, item: {} };
    case ADD_BANNED_WORDS:
      return { ...state, ...action.payload };
    case ADD_BANNED_WORDS_ERROR:
      return { ...initialValues, ...action.payload };
    case DELETE_BANNED_WORDS_SUCCESS_ERROR:
      return { ...state, success: '', error: '' };
    default:
      return state || initialValues;
  }
};
