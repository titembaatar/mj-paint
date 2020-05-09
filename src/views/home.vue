<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary>
      <homeDrawer />
    </v-navigation-drawer>

    <v-content>
      <v-btn absolute top left icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn absolute top right icon @click.stop="reset()">
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
      <v-btn absolute bottom right icon :to="{ name: 'Print' }">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
      <v-overlay :value="!this.$store.getters.loaded">
        <v-progress-circular
          color="white"
          indeterminate
          size="100"
          width="10"
        />
      </v-overlay>
      <div
        id="container"
        v-show="this.$store.getters.loaded === true ? true : false"
      >
        <homeOptions />
        <homeSVG />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import homeOptions from '@/components/homeOptions.vue'
import homeSVG from '@/components/homeSVG.vue'
import homeDrawer from '@/components/homeDrawer.vue'
import { mapState } from 'vuex'
import { ResetActive } from '../buses/reset-active'

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

export default {
  name: 'Home',
  components: {
    homeDrawer,
    homeOptions,
    homeSVG
  },
  data() {
    return {
      drawer: null
    }
  },
  methods: {
    reset() {
      for (let i = 0; i < this.pockets.length; i++) {
        const p = this.pockets[i]
        for (let j = 0; j < p.layers.length; j++) {
          const l = p.layers[j]
          l.pattern = ''
          l.color = 'none'
        }
      }
      ResetActive.$emit('resetClicked')
    }
  },
  computed: {
    ...mapState({
      pockets: state => state.active.pockets
    })
  }
}
</script>

<style lang="sass" scoped>
#container
  display: flex
  flex-flow: column nowrap
  align-items: center
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
</style>
