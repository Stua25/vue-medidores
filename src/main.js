import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// import VueSession from 'vue-session'
// Vue.use(VueSession)

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

var VueSession = require('vue-session')
Vue.use(VueSession)

var VueResource = require('vue-resource');
Vue.use(VueResource);


// import BootstrapVue from 'bootstrap-vue'
// Vue.use(BootstrapVue);

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
