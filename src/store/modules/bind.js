import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { db } from './db'

export default {
  state: {
    shops: [],
    jeans: [],
    patterns: [],
    colors: [],
    shopsLoaded: false,
    jeansLoaded: false,
    patternsLoaded: false,
    colorsLoaded: false
  },
  getters: {
    loaded: state => {
      return (
        state.shopsLoaded &&
        state.jeansLoaded &&
        state.patternsLoaded &&
        state.colorsLoaded
      )
    },
    shopsLength: state => {
      return state.shops.length
    },
    jeansLength: state => {
      return state.jeans.length
    },
    patternsLength: state => {
      return state.patterns.length
    },
    colorsLength: state => {
      return state.colors.length
    }
  },
  mutations: {
    DB_LOADED(state) {
      state.shopsLoaded = true
      state.jeansLoaded = true
      state.patternsLoaded = true
      state.colorsLoaded = true
    },
    ...vuexfireMutations
  },
  actions: {
    bindDB: firebaseAction(async ({ bindFirebaseRef, commit }) => {
      await new Promise((resolve, reject) => {
        bindFirebaseRef('shops', db.ref('shops'))
        bindFirebaseRef('jeans', db.ref('jeans'))
        bindFirebaseRef('patterns', db.ref('patterns'))
        bindFirebaseRef('colors', db.ref('colors'))
          .then(res => {
            commit('DB_LOADED')
            resolve(res)
          })
          .catch(err => {
            console.log('error')
            reject(err)
          })
      })
    }),
    push(context, object) {
      firebaseAction(
        db
          .ref(object.ref)
          .child(object.child)
          .set(object.data)
      )
    },
    remove(context, payload) {
      firebaseAction(
        db
          .ref(payload.ref)
          .child(payload.child)
          .remove()
      )
    },
    pushNewJeans: firebaseAction(object => {
      return db.ref('jeans').push(object)
    }),
    pushNewColor: firebaseAction(object => {
      return db.ref('colors').push(object)
    })
  }
}
