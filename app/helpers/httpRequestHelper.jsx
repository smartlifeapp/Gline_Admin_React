import { encodeBase64 } from './cryptHelper';

export const baseURL = { baseURL: process.env.ROOT_URL };

export const authHeaders = (stateAuth) => {
  let localAuth = localStorage.getItem('findball_admin_auth');
  if (localAuth) localAuth = JSON.parse(localAuth);
  let loginToken;
  if (stateAuth && stateAuth.loginToken) loginToken = stateAuth.loginToken;
  if (localAuth && localAuth.loginToken) loginToken = localAuth.loginToken;
  console.log(loginToken);
  return {
    headers: { 'Admin-Token': loginToken },
  };
};

export const parseParams = (prevMeta, nextMeta) => {
  const params = {
    order: nextMeta.order || prevMeta.order || 'id',
    orderBy: nextMeta.orderBy || prevMeta.orderBy || 'DESC',
    page: nextMeta.page || prevMeta.page || 1,
    limit: nextMeta.limit || prevMeta.limit || 30,
  };
  const structuredParams = `/${params.order}/${params.orderBy}/page/${params.page}/${params.limit}`;
  console.log('structuredParams', structuredParams);
  return structuredParams;
};

export const parseQuery = (dateField, nextMeta, route) => {
  const userFields = ['email', 'name', 'nickname', 'phoneNumber', 'comment', 'gender'];
  const paramKeys = ['page', 'pageCount', 'order', 'orderBy', 'limit', 'offset', 'itemCount'];
  const defaultValues = ['all', '전체'];
  const parsedQuery = {};
  Object.entries(nextMeta).forEach(([key, value]) => {
    if (value && paramKeys.indexOf(key) === -1 && defaultValues.indexOf(value) === -1) {
      let prefix = '';
      if (route !== 'users' && userFields.filter(field => field === key).length > 0) prefix = 'user.';
      if (key.includes('Date')) prefix += `${dateField || 'createdAt'}_`;
      parsedQuery[`${prefix}${key}`] = encodeBase64(value);
    }
  });
  console.log('parsedQuery', parsedQuery);
  return { params: parsedQuery };
};
