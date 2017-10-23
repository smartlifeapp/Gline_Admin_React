export function authHeaders(getState) {
  let auth = localStorage.getItem('seolreim_admin_auth');
  if (auth) auth = JSON.parse(auth);
  const loginToken = getState().auth.loginToken || auth.loginToken || undefined;
  return { headers: { 'User-Token': loginToken } };
}
