import {
  UNAUTH_ADMIN,
  ADD_ACCOMMODATION,
  ADD_ACCOMMODATIONS,
  RESET_ACCOMMODATIONS_META,
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

export const accommodationsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_ACCOMMODATION:
      return Object.assign({}, state, { item: action.payload });
    case ADD_ACCOMMODATIONS:
      return Object.assign({}, state, { items: action.payload.items, itemsMeta: action.payload.itemsMeta });
    case RESET_ACCOMMODATIONS_META:
      return Object.assign({}, state, { itemsMeta });
    default:
      return state;
  }
};

export default accommodationsReducer;
