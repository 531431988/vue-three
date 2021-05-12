import Vue from 'vue'
import App from './App'
import './plugins/ant-design-vue'
import './plugins/echarts'
import router from './router'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
