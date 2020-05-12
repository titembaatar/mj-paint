import firebase from 'firebase/app'
import router from '@/router'

export default {
  state: {
    user: null,
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
    },
    ERROR(state, error) {
      state.error.msg = error
      state.error.call = true
    }
  },
  actions: {
    fetchUser({ commit }, { email, password }) {
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
