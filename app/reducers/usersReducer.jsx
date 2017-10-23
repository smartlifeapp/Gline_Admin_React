import {
  // auth
  UNAUTH_ADMIN,
  // users
  ADD_USER,
  ADD_USERS,
  RESET_USERS_META,
} from 'actionTypes';

const itemsMeta = {
  orderBy: 'id',
  orderDirection: 'DESC',
  page: 1,
  limit: 30,
};

const initialValues = {
  item: {},
  items: [],
  selectedItems: [],
  itemsMeta,
};

export const usersReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_USER:
      return Object.assign({}, state, { item: payload });
    case ADD_USERS:
      return Object.assign({}, state, { items: payload.items, itemsMeta: payload.itemsMeta });
    case RESET_USERS_META:
      return Object.assign({}, state, { itemsMeta });
    default:
      return state;
  }
};

export default usersReducer;
