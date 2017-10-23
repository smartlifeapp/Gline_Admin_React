import {
  AUTH_ADMIN,
  UNAUTH_ADMIN,
} from 'actionTypes';

export const authReducer = (state, action) => {
  const initialValues = { authenticated: false, user: {}, authorization: '', loginToken: '', success: '', error: '' };
  switch (action.type) {
    case AUTH_ADMIN:
      return { ...state, error: '', authenticated: true, ...action.payload };
    case UNAUTH_ADMIN:
      return { ...initialValues, ...action.payload };
    default:
      return state || initialValues;
  }
};
