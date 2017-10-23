import {
  // auth
  UNAUTH_ADMIN,
  // properties
  ADD_PROPERTY,
  ADD_PROPERTIES,
  RESET_PROPERTIES_META,
} from 'actionTypes';

const itemsMeta = {
  orderBy: 'id',
  orderDirection: 'DESC',
  page: 1,
  limit: 30,
};

const initialValues = {
  restaurant: {},
  restaurants: [],
  restaurantsMeta: itemsMeta,
  accommodation: {},
  accommodations: [],
  accommodationsMeta: itemsMeta,
  review: {},
  reviews: [],
  reviewsMeta: itemsMeta,
  comment: {},
  comments: [],
  commentsMeta: itemsMeta,
  report: {},
  reports: [],
  reportsMeta: itemsMeta,
};

export const propertiesReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    // auth
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_PROPERTY:
      return Object.assign({}, state, { [payload.type]: payload.item });
    case ADD_PROPERTIES:
      return Object.assign({}, state, { [`${payload.type}s`]: payload.items, [`${payload.type}sMeta`]: payload.itemsMeta });
    case RESET_PROPERTIES_META:
      return Object.assign({}, state, { [`${payload.type}sMeta`]: itemsMeta });
    default:
      return state;
  }
};

export default propertiesReducer;
