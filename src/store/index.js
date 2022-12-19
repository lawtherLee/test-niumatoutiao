import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: JSON.parse(window.localStorage.getItem('userToken'))
    }
  },
  getters: {},
  mutations: {
    SET_TOKEN (state, payload) {
      state.user.token = payload
      window.localStorage.setItem('userToken', JSON.stringify(payload))
    }
  },
  actions: {},
  modules: {}
})
