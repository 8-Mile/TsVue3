import Vue from 'vue'
import VueRouter from "vue-router";
import Vuex from 'vuex'
import App from './App.vue'
import routes from "./routes";
import store from "./store/index.js";
import element from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from '@/utils/axios'
import '@/assets/scss/index.scss'
import api from "@/api/api.js"
import commonFun from '@/common/commonFun'
import '@/assets/icon/iconfont.css'
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(element);
// Vue.prototype.$http = axios // ajax请求方法
Vue.config.productionTip = false
Vue.prototype.API = api; // 接口
Vue.prototype.commonFun = commonFun; // 公共函数
Vue.prototype.$echarts = echarts //扩展echarts
const router = new VueRouter({
  mode: "history",
  routes,
});
new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");

