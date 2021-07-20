import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Home from './views/Home.vue';

  Vue.config.productionTip= true
  Vue.config.silent = true;
  Vue.config.debug = false;

Vue.component('home', Home);
new Vue({
  router,
  store,
  render: h => h(App)    
}).$mount('#app')