import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import feather from 'feather-icons';

import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import momentFilter from './filters/moment';

Vue.config.productionTip = false;

// axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);

Vue.filter('currency', currencyFilter);
Vue.filter('moment', momentFilter);
Vue.prototype.$moment = momentFilter;

Vue.prototype.API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT;
Vue.prototype.API_CUSTOM_PATH = process.env.VUE_APP_API_CUSTOM_PATH;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// 由于需要组件 mounted 此函数才会生效，所以这里暂时用个定时器
setInterval(() => {
  feather.replace();
}, 500);
