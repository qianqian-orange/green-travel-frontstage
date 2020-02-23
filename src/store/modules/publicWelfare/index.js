import {
  GET_DATA,
} from './mutation-types';

const initState = {
  list: [],
  pageSize: 5,
  currentPage: 1,
  finished: false,
  condition: {},
};

const mutations = {
  [GET_DATA](state, payload) {
    state.list = state.list.concat(payload);
    state.currentPage += 1;
    if (payload.length === 0) state.finished = true;
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
};