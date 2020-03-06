import {
  GET_DATA,
  CLEAR,
  CONVERSION,
  UPDATE_CONDITION,
} from './mutation-types';

const initState = {
  list: [],
  pageSize: 10,
  currentPage: 1,
  finished: false,
  condition: {
    name: '',
  },
};

const getters = {
  find: state => id => state.list.find(item => item.id === id),
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
  [CONVERSION](state, { id }) {
    const merchandise = state.list.find(item => item.id === id);
    if (merchandise) merchandise.stock -= 1;
  },
  [UPDATE_CONDITION](state, payload) {
    const { name } = payload;
    state.condition.name = name;
  },
  [CLEAR](state) {
    state.list = [];
    state.finished = false;
    state.currentPage = 1;
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  getters,
};