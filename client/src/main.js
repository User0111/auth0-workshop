import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import VuexAxios from 'vue-axios';

import axios from 'axios';

Vue.use(VuexAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
