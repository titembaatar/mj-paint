export default {
  state: {
    shop: {
      id: '',
      display: '店舗',
      colorDisplay: '',
      color: '#111111'
    },
    jean: {
      id: 'shutsujin',
      display: '出陣',
      pocketColor: '#01060C',
      stripes: true,
      stripeUpFill: '#ffffff',
      stripeDwnFill: '#ffffff',
      stitch: false,
      kids: false
    },
    pockets: [
      {
        id: 'l',
        display: '左',
        layers: [
          {
            id: 'l1',
            display: '1',
            pattern: '',
            patternID: '',
            patternDisplay: '',
            limitedColor: false,
            icsp: false,
            color: 'none',
            colorID: ''
          },
          {
            id: 'l2',
            display: '2',
            pattern: '',
            patternID: '',
            patternDisplay: '',
            limitedColor: false,
            icsp: false,
            color: 'none',
            colorID: ''
          },
          {
            id: 'l3',
            display: '3',
            pattern: '',
            patternID: '',
            patternDisplay: '',
            limitedColor: false,
            icsp: false,
            color: 'none',
            colorID: ''
          }
        ]
      },
      {
        id: 'r',
        display: '右',
        layers: [
          {
            id: 'r1',
            display: '1',
            pattern: '',
            patternID: '',
            patternDisplay: '',
            limitedColor: false,
            icsp: false,
            color: 'none',
            colorID: ''
          },
          {
            id: 'r2',
            display: '2',
            pattern: '',
            patternID: '',
            patternDisplay: '',
            limitedColor: false,
            icsp: false,
            color: 'none',
            colorID: ''
          },
          {
            id: 'r3',
            display: '3',
            pattern: '',
            patternID: '',
            patternDisplay: '',
            limitedColor: false,
            icsp: false,
            color: 'none',
            colorID: ''
          }
        ]
      }
    ]
  },
  getters: {
    shopColor: state => {
      return [
        {
          id: 'limitedColor',
          ic: true,
          display: '限定',
          colorDisplay: state.shop.colorDisplay,
          color: state.shop.color
        }
      ]
    },
    paintNumber: state => {
      let pN = 0
      for (let i = 0; i < state.pockets.length; i++) {
        const p = state.pockets[i]
        for (let j = 0; j < p.layers.length; j++) {
          const l = p.layers[j]
          if (l.pattern !== '') {
            pN++
          }
        }
      }
      return pN
    }
  },
  mutations: {
    SET_SHOP_ACTIVE(state, object) {
      state.shop = object
    },
    SET_JEAN_ACTIVE(state, object) {
      state.jean = object
    },
    SET_PATTERN(state, [n, id, display, icsp, i, j]) {
      state.pockets[i].layers[j].pattern = n
      state.pockets[i].layers[j].patternID = id
      state.pockets[i].layers[j].patternDisplay = display
      state.pockets[i].layers[j].icsp = icsp
    },
    SET_COLOR(state, [bool, color, ID, i, j]) {
      state.pockets[i].layers[j].limitedColor = bool
      state.pockets[i].layers[j].color = color
      state.pockets[i].layers[j].colorID = ID
    }
  },
  actions: {
    updateValue({ commit }, payload) {
      commit('updateValue', payload)
    }
  }
}
