import firebase from 'firebase/app'
import router from '@/router'

export default {
  state: {
    user: null,
    load: false,
    error: {
      call: false,
      msg: null
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
      state.load = false
    },
    LOAD(state) {
      state.load = true
    },
    ERROR(state, error) {
      state.error.msg = error
      state.error.call = true
      state.load = false
    }
  },
  actions: {
    fetchUser({ commit }, { email, password }) {
      commit('LOAD')

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(result) {
          const { uid } = result.user
          const user = { uid }
          commit('SET_USER', user)

          router.push({ name: 'Admin' })
        })
        .catch(function(error) {
          commit('ERROR', error)
        })
    }
  }
}
