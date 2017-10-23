import axios from 'axios';
import { axiosConfig, handleError } from 'serverHelper';
import {
  // groupChats
  ADD_GROUP_CHATS,
  RESET_GROUP_CHATS,
  ADD_GROUP_CHATROOMS,
  UPDATE_ITEM_IN_GROUP_CHATS,
  UPDATE_ITEM_IN_GROUP_CHATROOMS,
  UPDATE_GROUP_CHATS_META,
  // global
  START_LOADING,
  STOP_LOADING,
  COMMON_ERROR,
  OPEN_MODAL,
} from 'actionTypes';

export const postGroupChat = ({ type, parentUid, content, photoUrl, ratio }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.post(`/groupChat/${parentUid}`, { type, content, photoUrl, ratio }, config);
    dispatch({ type: ADD_GROUP_CHATS, payload: { type, items: [resData] } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putGroupChat = ({ type, uid, content, photoUrl, ratio, status }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const index = getState().groupChats[type].findIndex(item => item.uid === uid);
    const config = axiosConfig(getState);
    const { data: { resMessage, resData } } = await axios.put(`/groupChat/${uid}`, { type, content, photoUrl, ratio, status }, config);
    if (index !== -1) dispatch({ type: UPDATE_ITEM_IN_GROUP_CHATS, payload: { type, item: resData, index } });
    if (resMessage) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putGroupChats = ({ parentUids, updateForm }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/groupChats/${parentUids}`;
    const config = axiosConfig(getState);
    const { data: { resMessage } } = await axios.put(route, updateForm, config);
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const updateItemInGroupChatrooms = ({ uid, type, item }) => (dispatch, getState) => {
  const index = getState().groupChats[type].findIndex(room => room.uid === uid);
  console.log('index', index);
  if (index || index === 0) dispatch({ type: UPDATE_ITEM_IN_GROUP_CHATROOMS, payload: { index, type, item } });
};

export const resetGroupChats = ({ type }) => dispatch => dispatch({ type: RESET_GROUP_CHATS, payload: { type } });

export const getGroupChatrooms = ({ type, nextMeta }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/groupChatrooms/admin/${type}`;
    const stateMeta = getState().groupChats[`${type}sMeta`];
    const config = axiosConfig(getState, stateMeta, nextMeta);
    console.log('config', config);
    const { data: { resMessage, resMeta, resData } } = await axios.get(route, config);
    if (['mission', 'discussion', 'confirmShot', 'teamplay'].indexOf(type) !== -1) dispatch({ type: ADD_GROUP_CHATROOMS, payload: { type: `${type}s`, items: resData, itemsMeta: resMeta } });
    if (resData.length === 0) dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const getGroupChats = ({ type, parentUid, firstItemId }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const config = Object.assign({}, axiosConfig(getState), firstItemId && { params: { firstItemId } });
    const { data: { resData } } = await axios.get(`/groupChats/${type}/${parentUid}`, config);
    dispatch({ type: ADD_GROUP_CHATS, payload: { type, items: resData, isOldItems: firstItemId !== undefined } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const getGroupChatroom = ({ uid }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/groupChatroom/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.get(route, config);
    dispatch({ type: UPDATE_GROUP_CHATS_META, payload: { selectedRoom: resData } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putGroupChatroom = ({ uid, updateForm = {} }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/groupChatroom/${uid}`;
    const config = axiosConfig(getState);
    const { data: { resMessage, resData } } = await axios.put(route, updateForm, config);
    dispatch({ type: UPDATE_GROUP_CHATS_META, payload: { selectedRoom: resData } });
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback(resData);
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putGroupChatrooms = ({ uids, updateForm }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = `/groupChatrooms/${uids}`;
    const config = axiosConfig(getState);
    const { data: { resMessage } } = await axios.put(route, updateForm, config);
    dispatch({ type: OPEN_MODAL, payload: { type: 'notification', message: resMessage } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const getCurrentMission = (callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = '/settings/currentMission';
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.get(route, config);
    dispatch({ type: UPDATE_GROUP_CHATS_META, payload: { currentMission: resData } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const putCurrentMission = ({ int }, callback = () => {}) => async (dispatch, getState) => {
  dispatch({ type: START_LOADING });
  try {
    const route = '/settings/currentMission';
    const config = axiosConfig(getState);
    const { data: { resData } } = await axios.put(route, { int }, config);
    dispatch({ type: UPDATE_GROUP_CHATS_META, payload: { currentMission: resData } });
    dispatch({ type: STOP_LOADING });
    callback();
  } catch (error) {
    handleError(COMMON_ERROR, error, dispatch);
  }
};

export const updateGroupChatsMeta = (payload, callback = () => {}) => (dispatch) => {
  dispatch({ type: UPDATE_GROUP_CHATS_META, payload });
  callback();
};
