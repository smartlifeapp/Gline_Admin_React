import {
  UNAUTH_ADMIN,
  ADD_STATS,
  UPDATE_STATS,
} from 'actionTypes';
// '라이브 설레임愛': '#ef1124', F13C4B
//   하이러브: '#6ecdf7',
//   손대면톡: '#70d67e',
//   썸라이브: '#e23544', E96C77
const initialValues = {
  img: undefined,
  title: undefined,
  content: undefined,
  url: undefined,
  etc: undefined
  },
};

export const storyReducer = (state = initialValues, action) => {
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case UPDATE_STATS:
      return Object.assign({}, state, action.payload);
    case ADD_STATS:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};
