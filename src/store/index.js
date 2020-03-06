import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import merchandise from './modules/merchandise';
import publicWelfare from './modules/publicWelfare';
import task from './modules/task';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    merchandise,
    publicWelfare,
    task,
  },
});
