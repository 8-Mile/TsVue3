import Vue from 'vue'
import VueRouter from "vue-router";
import Vuex from 'vuex'
import App from './App.vue'
import routes from "./routes";
import store from "./store/index.js";
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(element);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes,
});
new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");

