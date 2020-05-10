<template>
  <v-app>
    <v-app-bar app color="white" v-if="$vuetify.breakpoint.xsOnly">
      <v-icon>$logo</v-icon>
      <v-spacer />
      <v-btn icon :to="{ name: 'Print' }">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
      <v-btn icon @click.stop="reset()">
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs grow v-model="tab">
          <v-tab>左</v-tab>
          <v-tab>右</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      :right="$vuetify.breakpoint.xsOnly ? true : false"
    >
      <homeDrawer />
    </v-navigation-drawer>

    <v-content v-if="$vuetify.breakpoint.smAndUp">
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

    <v-content v-if="$vuetify.breakpoint.xsOnly">
      <v-container fill-height>
        <v-row>
          <v-col>
            <v-tabs-items v-model="tab" class="pa-4">
              <v-tab-item>
                <homeLeft />
              </v-tab-item>
              <v-tab-item>
                <homeRight />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="n in 7"
                :key="n"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  class="ma-2"
                  :input-value="active"
                  active-class="purple white--text"
                  depressed
                  @click="toggle"
                >
                  Options {{ n }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="n in 7"
                :key="n"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  class="ma-2"
                  :input-value="active"
                  active-class="purple white--text"
                  depressed
                  @click="toggle"
                >
                  Options {{ n }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
            <v-slide-group show-arrows>
              <v-slide-item
                v-for="n in 7"
                :key="n"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  class="ma-2"
                  :input-value="active"
                  active-class="purple white--text"
                  depressed
                  @click="toggle"
                >
                  Options {{ n }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import homeOptions from '@/components/homeOptions.vue'
import homeSVG from '@/components/homeSVG.vue'
import homeDrawer from '@/components/homeDrawer.vue'
import homeLeft from '@/components/homeLeft.vue'
import homeRight from '@/components/homeRight.vue'
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
    homeSVG,
    homeLeft,
    homeRight
  },
  data() {
    return {
      drawer: null,
      tab: null
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
