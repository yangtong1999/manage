// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import ElementUI from 'element-ui'
import echarts from "echarts"
 import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
