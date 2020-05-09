import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import bind from './modules/bind'
import active from './modules/active'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bind,
    active
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
