export const parseMeta = (resMeta, params) => ({
  page: resMeta.page || 1,
  limit: resMeta.limit || 30,
  pageCount: resMeta.pageCount || 0,
  email: params.email,
  name: params.name,
  nickname: params.nickname,
  comment: params.comment,
  gender: params.gender,
  startDate: params.startDate,
  endDate: params.endDate,
});
