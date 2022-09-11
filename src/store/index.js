import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 封装本地存储 vuex-persistedstate 持久化state
// - 下载
// - 引入 import createPersistedState from 'vuex-persistedstate'
// - 调用 plugins：[]
// - 配置项
//  - key:默认值vuex
//  - storage:存储的方式，默认本地存储
//  - reducer:指定持久化哪些数据，return一个对象，作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage:window.sessionStorage
      reducer ({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin (state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
