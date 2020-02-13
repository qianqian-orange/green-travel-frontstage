import { SAVE, UPDATE_INTEGRAL } from './mutation-types';

const initState = {
  id: -1,
  name: '',
  integral: 0,
};

const actions = {
  save({ commit }, payload) {
    commit(SAVE, payload);
  },
};

const mutations = {
  [SAVE](state, { id, name, integral }) {
    state.id = id;
    state.name = name;
    state.integral = integral;
  },
  [UPDATE_INTEGRAL](state, { integral, operator }) {
    if (operator === '+') {
      state.integral = (parseInt(state.integral * 100, 10) + parseInt(integral * 100, 10)) / 100;
      return;
    }
    state.integral = (parseInt(state.integral * 100, 10) - parseInt(integral * 100, 10)) / 100;
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};