import {
  SAVE,
  SIGN_IN,
  GET_PUBLIC_WELFARE_DATA,
  GET_COUPON_DATA,
  GET_TASK_DATA,
  GET_TASK_COUPONS_DATA,
  ADD_TASK,
  ACQUIRE,
  CLEAR_COUPON,
  DONATE,
  CONVERSION,
} from './mutation-types';

const initState = {
  id: -1,
  name: '',
  integral: 0,
  level: 1,
  growth: 0,
  tasks: [],
  publicWelfare: {
    list: [],
    finished: false,
    condition: {},
    pageSize: 5,
    currentPage: 1,
  },
  coupon: {
    list: [],
    finished: false,
    condition: {},
    pageSize: 10,
    currentPage: 1,
  },
};

const actions = {
  save({ commit }, payload) {
    commit(SAVE, payload);
  },
};

const mutations = {
  [SAVE](state, {
    id,
    name,
    integral,
    growth,
    lv,
    tasks,
  }) {
    state.id = id;
    state.name = name;
    state.integral = integral;
    state.growth = growth;
    state.level = lv;
    state.tasks = tasks;
  },
  [SIGN_IN](state, integral) {
    state.integral = (parseInt(state.integral * 100, 10) + parseInt(integral * 100, 10)) / 100;
  },
  [CONVERSION](state, { integral, id }) {
    state.integral = (parseInt(state.integral * 100, 10) - parseInt(integral * 100, 10)) / 100;
    const index = state.coupon.list.findIndex(item => item.uc_id === id);
    state.coupon.list.splice(index, 1);
  },
  [GET_PUBLIC_WELFARE_DATA](state, payload) {
    const { publicWelfare } = state;
    publicWelfare.list = publicWelfare.list.concat(payload);
    if (payload.length === 0) {
      publicWelfare.finished = true;
      return;
    }
    publicWelfare.currentPage += 1;
  },
  [GET_COUPON_DATA](state, payload) {
    const { coupon } = state;
    coupon.list = coupon.list.concat(payload);
    if (payload.length === 0) {
      coupon.finished = true;
      return;
    }
    coupon.currentPage += 1;
  },
  [CLEAR_COUPON](state) {
    const { coupon } = state;
    coupon.list = [];
    coupon.currentPage = 1;
    coupon.finished = false;
  },
  [GET_TASK_DATA](state, payload) {
    state.tasks = payload;
  },
  [GET_TASK_COUPONS_DATA](state, payload) {
    const task = state.tasks.find(item => item.id === payload.id);
    if (task) task.coupons = payload.coupons;
  },
  [ADD_TASK](state, payload) {
    state.tasks.push(payload);
  },
  [ACQUIRE](state, {
    lv,
    growth,
    integral,
    id,
  }) {
    state.level = lv;
    state.growth = growth;
    state.integral = integral;
    const task = state.tasks.find(item => item.id === id);
    task.acquire = 1;
    const { coupon } = state;
    if (coupon.list.length > 0) {
      coupon.list = [];
      coupon.currentPage = 1;
      coupon.finished = false;
    }
  },
  [DONATE](state, integral) {
    state.integral = (parseInt(state.integral * 100, 10) - parseInt(integral * 100, 10)) / 100;
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};