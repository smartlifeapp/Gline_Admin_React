import { encodeBase64 } from './cryptHelper';

const ROOT_URL = 'http://ec2-52-14-77-247.us-east-2.compute.amazonaws.com:3000';

export const parseParams = (params) => {
  const returnParams = {
    email: encodeBase64(params.email) || 'bnVsbA==',
    name: encodeBase64(params.name) || 'bnVsbA==',
    nickname: encodeBase64(params.nickname) || 'bnVsbA==',
    phoneNumber: encodeBase64(params.phoneNumber) || 'bnVsbA==',
    comment: (params.comment === '전체' || !params.comment) ? 'bnVsbA==' : encodeBase64(params.comment),
    gender: 'all',
    page: params.page || 1,
    limit: params.limit || 30,
  };
  if (params.gender === '남성') {
    returnParams.gender = 'male';
  } else if (params.gender === '여성') {
    returnParams.gender = 'female';
  }
  return returnParams;
};

export const userUpdateLogsParam = (params) => {
  // GET /admin/userUpdateLogs/:email/:name/:nickname/:comment/:gender/:page/:limit (관리자 유저변경 목록)
  const email = (params.email) ? encodeBase64(params.email) : 'bnVsbA==';
  const name = (params.name) ? encodeBase64(params.name) : 'bnVsbA==';
  const nickname = (params.nickname) ? encodeBase64(params.nickname) : 'bnVsbA==';
  const comment = (params.comment === '전체' || !params.comment) ? 'bnVsbA==' : encodeBase64(params.comment);
  let gender = 'all';
  if (params.gender === '남성') {
    gender = 'male';
  } else if (params.gender === '여성') {
    gender = 'female';
  }
  const page = params.page || 1;
  const limit = params.limit || 30;

  const requestParams = `${ROOT_URL}/admin/userUpdateLogs/${email}/${name}/${nickname}/${comment}/${gender}/${page}/${limit}`;
  return requestParams;
};

export const usersParam = (params) => {
  // const app = (params.app) ? encodeBase64(params.app) : 'YWxs';
  const email = (params.email) ? encodeBase64(params.email) : 'bnVsbA==';
  const name = (params.name) ? encodeBase64(params.name) : 'bnVsbA==';
  const nickname = (params.nickname) ? encodeBase64(params.nickname) : 'bnVsbA==';
  const comment = (params.comment === '전체' || !params.comment) ? 'bnVsbA==' : encodeBase64(params.comment);
  let gender = 'all';
  if (params.gender === '남성') {
    gender = 'male';
  } else if (params.gender === '여성') {
    gender = 'female';
  }
  const loginStartDate = params.startDate || 'null';
  const loginEndDate = params.endDate || 'null';
  const page = params.page || 1;
  const limit = params.limit || 30;

  const requestParams = `${ROOT_URL}/admin/users/${email}/${name}/${nickname}/${comment}/${gender}/${loginStartDate}/${loginEndDate}/${page}/${limit}`;

  return requestParams;
};
