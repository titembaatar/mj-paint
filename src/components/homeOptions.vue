<template>
  <div class="d-flex flex-column align-center flex-grow-1">
    <div class="d-flex flex-row">
      <btnToggle
        :objects="pockets"
        :value="false"
        @click="setPocketActive($event)"
        v-if="$vuetify.breakpoint.smAndUp"
      />
      <btnToggle
        :objects="pockets[pocketActive].layers"
        :value="false"
        @click="setLayerActive($event)"
      />
    </div>
    <btnToggle
      :objects="displayPatterns"
      :value="true"
      @click="setPatternActive($event)"
    />
    <btnToggle
      :objects="displayColors"
      :value="true"
      @click="setColorActive($event)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import btnToggle from '@/components/btnToggle.vue'

export default {
  components: {
    btnToggle
  },
  props: {
    tabPocket: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      pocketActive: 0,
      layerActive: null,
      patternActive: null
    }
  },
  methods: {
    setPocketActive(n) {
      this.pocketActive = n[0]
    },
    setLayerActive(n) {
      this.layerActive = n[0]
    },
    setPatternActive(n) {
      let i = this.tabPocket === null ? this.pocketActive : this.tabPocket
      let j = this.layerActive
      let index = n[0]
      let id = n[1]
      this.patternActive = id
      this.$store.commit('SET_PATTERN', [
        this.displayPatterns[index].path,
        this.displayPatterns[index].id,
        this.displayPatterns[index].print,
        this.displayPatterns[index].icsp,
        i,
        j
      ])
    },
    setColorActive(n) {
      let i = this.tabPocket === null ? this.pocketActive : this.tabPocket
      let j = this.layerActive
      let index = n[0]
      let id = n[1]
      if (id === 'limitedColor') {
        this.$store.commit('SET_COLOR', [
          true,
          this.displayColors[index].color,
          this.displayColors[index].colorDisplay,
          i,
          j
        ])
      } else {
        this.$store.commit('SET_COLOR', [
          false,
          this.displayColors[index].color,
          this.displayColors[index].colorDisplay,
          i,
          j
        ])
      }
    }
  },
  computed: {
    ...mapState({
      aShops: state => state.active.shop,
      aJeans: state => state.active.jean,
      pockets: state => state.active.pockets,
      patterns: state => state.bind.patterns,
      colors: state => state.bind.colors
    }),
    kidsPatterns() {
      let kJ = this.patterns.filter(object => object.kids === true)
      return kJ
    },
    displayPatterns() {
      if (this.aJeans.kids === true) {
        return this.kidsPatterns
      }
      return this.patterns
    },
    noIcColors() {
      let nIC = this.colors.filter(object => object.ic === false)
      return nIC.concat(this.$store.getters.shopColor)
    },
    icColors() {
      let iC = this.colors.filter(object => object.ic === true)
      return iC.concat(this.$store.getters.shopColor)
    },
    displayColors() {
      if (this.patternActive === 'ic') {
        return this.icColors
      } else {
        return this.noIcColors
      }
    }
  }
}
</script>
