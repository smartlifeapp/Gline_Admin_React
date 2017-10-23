import _ from 'lodash';
import {
  // auth
  UNAUTH_ADMIN,
  // groupChats
  ADD_GROUP_CHATS,
  ADD_GROUP_CHATROOMS,
  UPDATE_ITEM_IN_GROUP_CHATS,
  UPDATE_ITEM_IN_GROUP_CHATROOMS,
  RESET_GROUP_CHATS,
  UPDATE_GROUP_CHATS_META,
} from 'actionTypes';

const meta = {
  selectedRoom: {},
  currentMission: {},
  createdTeamplayRoomUid: undefined,
  isMoreDataAvailable: true,
  prevFirstItemId: undefined,
};

const itemsMeta = {
  orderBy: 'id',
  orderDirection: 'ASC',
  page: 1,
  limit: 30,
};

const initialValues = {
  mission: [],
  missions: [],
  missionsMeta: itemsMeta,
  discussion: [],
  discussions: [],
  discussionsMeta: itemsMeta,
  confirmShot: [],
  confirmShots: [],
  teamplay: [],
  teamplays: [],
  teamplaysMeta: Object.assign({}, itemsMeta, { orderDirection: 'DESC' }),
  meta,
};

export const groupChatsReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    // auth
    case UNAUTH_ADMIN:
      return initialValues;
    case ADD_GROUP_CHATROOMS:
      return Object.assign({}, state, { [payload.type]: payload.items, [`${payload.type}Meta`]: payload.itemsMeta });
    case ADD_GROUP_CHATS:
      if (payload.isOldItems) return Object.assign({}, state, { [payload.type]: _.uniqBy(payload.items.concat(state[payload.type]), 'uid'), meta: Object.assign({}, state.meta, { isMoreDataAvailable: payload.items.length === 30 }) });
      return Object.assign({}, state, { [payload.type]: _.uniqBy(state[payload.type].concat(payload.items), 'uid'), meta: Object.assign({}, state.meta, { isMoreDataAvailable: payload.items.length === 30 }) });
    case UPDATE_ITEM_IN_GROUP_CHATS:
      return Object.assign({}, state, { [payload.type]: state[payload.type].slice(0, payload.index).concat([payload.item], state[payload.type].slice(payload.index + 1, state[payload.type].length)) });
    case UPDATE_ITEM_IN_GROUP_CHATROOMS:
      return Object.assign({}, state, { [payload.type]: state[payload.type].slice(0, payload.index).concat([Object.assign({}, state[payload.type][payload.index], payload.item)], state[payload.type].slice(payload.index + 1, state[payload.type].length)) });
    case RESET_GROUP_CHATS:
      return Object.assign({}, state, { [payload.type]: [], meta: Object.assign({}, state.meta, { selectedRoom: {} }) });
    case UPDATE_GROUP_CHATS_META:
      return Object.assign({}, state, { meta: Object.assign({}, state.meta, payload) });
    default:
      return state;
  }
};

export default groupChatsReducer;
