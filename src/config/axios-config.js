import axios from 'axios';
import { Notify } from 'vant';

axios.interceptors.request.use(config => config, (e) => {
  Notify({ type: 'danger', message: '请求超时，请稍后重试！' });
  return Promise.reject(e);
});

axios.interceptors.response.use(response => response, (e) => {
  Notify({ type: 'danger', message: '服务端出错啦！' });
  return Promise.reject(e);
});