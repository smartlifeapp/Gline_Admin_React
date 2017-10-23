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
  app: undefined,
  platform: undefined,
  gender: undefined,
  createdAtDaily: undefined,
  userCount: 0,
  userMonthCount: 0,
  userActive: {
    total: '0%',
    male: '0%',
    female: '0%',
  },
  userLocationOn: { count: 0, ratio: 0 },
  talkCount: 0,
  talkActiveCount: 0,
  photoCount: 0,
  photoActiveCount: 0,
  purchaseCountMonthly: [],
};

export const statsReducer = (state = initialValues, action) => {
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
