import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
require('./css/style.css');

Vue.config.ignoredElements = [/^ion-/];


Vue.config.productionTip = false;

Vue.use(Buefy);
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
