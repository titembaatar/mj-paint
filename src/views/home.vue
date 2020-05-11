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
      <v-container
        fill-height
        v-show="this.$store.getters.loaded === true ? true : false"
      >
        <v-row class="mt-8" justify="space-around">
          <homeSVG :stitch="false" :sp="false" :layers="pockets[0].layers" />
          <homeSVG :stitch="true" :sp="true" :layers="pockets[1].layers" />
        </v-row>
        <homeOptions />
      </v-container>
    </v-content>

    <v-content v-if="$vuetify.breakpoint.xsOnly">
      <v-container fill-height>
        <v-row>
          <v-col>
            <v-tabs-items v-model="tab" class="pa-4">
              <v-tab-item>
                <homeSVG
                  :stitch="false"
                  :sp="false"
                  :layers="pockets[0].layers"
                />
              </v-tab-item>
              <v-tab-item>
                <homeSVG
                  :stitch="true"
                  :sp="true"
                  :layers="pockets[1].layers"
                />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
        <homeOptions />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import homeOptions from '@/components/homeOptions.vue'
import homeSVG from '@/components/homeSVG.vue'
import homeDrawer from '@/components/homeDrawer.vue'
import { mapState } from 'vuex'
import { ResetActive } from '../buses/reset-active'

export default {
  name: 'Home',
  components: {
    homeDrawer,
    homeOptions,
    homeSVG
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
