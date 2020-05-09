import firebase from 'firebase/app'
import router from '@/router'

export default {
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
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
      // .catch(function(error) {
      //   console.log(error)
      // })
    }
  }
}
