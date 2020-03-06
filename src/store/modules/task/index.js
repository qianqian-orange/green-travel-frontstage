import {
  GET_DATA,
  GET_COUPONS_DATA,
  UPDATE_TASK,
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
    if (payload.length === 0) {
      state.finished = true;
      return;
    }
    state.currentPage += 1;
  },
  [GET_COUPONS_DATA](state, payload) {
    const task = state.list.find(item => item.id === payload.id);
    if (task) task.coupons = payload.coupons;
  },
  [UPDATE_TASK](state, id) {
    const task = state.list.find(item => item.id === id);
    task.disabled = true;
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
};