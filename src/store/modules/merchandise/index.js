import axios from 'axios';
import { Notify } from 'vant';
import {
  GET_DATA,
  GET_TOTAL,
  CLEAR,
  UPDATE_CONDITION,
} from './mutation-types';

const initState = {
  list: [],
  pageSize: 10,
  currentPage: 1,
  total: 0,
  finished: false,
  condition: {
    name: '',
  },
};

const getters = {
  find: state => id => state.list.find(item => item.id === id),
};

const actions = {
  getTotal({ commit, state }) {
    const { condition } = state;
    axios.get('/api/merchandise/total', {
      params: {
        ...condition,
      },
    }).then((result) => {
      const { code, data } = result.data;
      if (code === 0) commit(GET_TOTAL, data);
      else Notify({ type: 'danger', message: '数据请求失败！' });
    });
  },
  getData({ commit, state }, handle) {
    if (state.finished) return;
    const { pageSize, currentPage, condition } = state;
    axios.get('/api/merchandise/list', {
      params: {
        pageSize,
        currentPage,
        ...condition,
      },
    }).then((result) => {
      const { data, code } = result.data;
      if (code === 0) {
        commit(GET_DATA, data);
        handle();
        return;
      }
      Notify({ type: 'danger', message: '数据请求失败！' });
    });
  },
};

const mutations = {
  [GET_DATA](state, payload) {
    const { total } = state;
    if (state.currentPage === 1) state.list = payload;
    else state.list = state.list.concat(payload);
    state.currentPage += 1;
    if (total !== 0 && state.list.length === total) state.finished = true;
  },
  [GET_TOTAL](state, payload) {
    state.total = payload;
    if (state.total === 0 || state.total <= state.pageSize) state.finished = true;
  },
  [UPDATE_CONDITION](state, payload) {
    const { name } = payload;
    state.condition.name = name;
  },
  [CLEAR](state) {
    state.finished = false;
    state.currentPage = 1;
    state.total = 0;
  },
};

export default {
  namespaced: true,
  state: initState,
  actions,
  mutations,
  getters,
};