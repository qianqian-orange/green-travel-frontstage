import axios from 'axios';
import router from './router';
import store from './store';

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  if (store.state.user.id === -1) {
    const { data: { user } } = await axios.get('/api/user');
    if (user) store.dispatch('user/save', user);
  }
  if (store.state.user.id !== -1) {
    if (to.path === '/login') next({ path: '/' });
    else next();
  } else if (whiteList.indexOf(to.path) !== -1) next();
  else next(`/login?redirect=${to.path}`);
});