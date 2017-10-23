import {
  // auth
  UNAUTH_ADMIN,
  // restaurants
  ADD_RESTAURANTS,
  ADD_RESTAURANT,
  RESET_RESTAURANTS_META,
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

export const restaurantsReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_RESTAURANT:
      return Object.assign({}, state, { item: payload });
    case ADD_RESTAURANTS:
      return Object.assign({}, state, { items: payload.items, itemsMeta: payload.itemsMeta });
    case RESET_RESTAURANTS_META:
      return Object.assign({}, state, { itemsMeta });
    default:
      return state;
  }
};

export default restaurantsReducer;
