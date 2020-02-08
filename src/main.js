import Vue from 'vue';
import {
  Search,
  Button,
  List,
  Loading,
  Notify,
  Image,
  Icon,
  Divider,
} from 'vant';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import App from './App.vue';
import router from './router';
import store from './store';
import './config/axios-config';
import './permission';
import 'normalize.css';
import '@/assets/sass/index.scss';

Vue.use(Search);
Vue.use(Button);
Vue.use(List);
Vue.use(Loading);
Vue.use(Notify);
Vue.use(Image);
Vue.use(Icon);
Vue.use(Divider);
BScroll.use(Slide);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
