import {
  UNAUTH_ADMIN,
  ADD_PURCHASE_LOG,
  ADD_PURCHASE_LOGS,
  RESET_PURCHASE_LOGS_META,
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

export const purchaseLogsReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_PURCHASE_LOG:
      return Object.assign({}, state, { item: payload });
    case ADD_PURCHASE_LOGS:
      return Object.assign({}, state, { items: payload.items, itemsMeta: payload.itemsMeta });
    case RESET_PURCHASE_LOGS_META:
      return Object.assign({}, state, { itemsMeta });
    default:
      return state;
  }
};

export default purchaseLogsReducer;
