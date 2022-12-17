import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './styles/fonts/iconfont.css'
import 'vant/lib/index.css'
import Vant from 'vant'
import 'amfe-flexible'
import './styles/index.less'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
