<template>
  <v-content>
    <v-container fill-height class="d-flex flex-column">
      <v-toolbar flat width="inherit" class="flex-grow-0">
        <v-btn depressed large color="primary" :to="{ name: 'Home' }">
          <v-icon>$logo</v-icon>
        </v-btn>
        <v-tabs v-model="tab" centered>
          <v-tab v-for="(object, i) in OBJECTS" :key="i">
            <v-icon>{{ object.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tab" class="pa-2 flex-grow-1">
        <v-tab-item v-for="(object, i) in OBJECTS" :key="i">
          <adminGestion :objects="object.array" :reference="object.reference" />
        </v-tab-item>
      </v-tabs-items>

      <v-btn
        fixed
        fab
        bottom
        right
        dark
        color="red"
        @click="overlay = !overlay"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-overlay :value="overlay">
        <v-btn fixed icon top right dark @click="overlay = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-card
          class="pa-4 flow"
          light
          v-show="tab === 0"
          max-width="340px"
          max-height="90vh"
        >
          <formShops @submit="push($event)" />
        </v-card>
        <v-card
          class="pa-4 flow"
          light
          v-show="tab === 1"
          max-width="340px"
          max-height="90vh"
        >
          <formJeans @submit="push($event)" />
        </v-card>
        <v-card
          class="pa-4 flow"
          light
          v-show="tab === 3"
          max-width="340px"
          max-height="90vh"
        >
          <formColors @submit="push($event)" />
        </v-card>
      </v-overlay>
    </v-container>
  </v-content>
</template>

<script>
import adminGestion from '@/components/adminGestion.vue'
import formShops from '@/components/forms/shops.vue'
import formJeans from '@/components/forms/jeans.vue'
import formColors from '@/components/forms/colors.vue'
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  components: {
    adminGestion,
    formShops,
    formJeans,
    formColors
  },
  data() {
    return {
      tab: null,
      overlay: false
    }
  },
  computed: {
    ...mapState({
      shops: state => state.bind.shops,
      jeans: state => state.bind.jeans,
      patterns: state => state.bind.patterns,
      colors: state => state.bind.colors
    }),
    OBJECTS() {
      return [
        { array: this.shops, icon: 'mdi-store', reference: 'shops' },
        { array: this.jeans, icon: '$jeansfold', reference: 'jeans' },
        { array: this.patterns, icon: 'mdi-shape', reference: 'patterns' },
        { array: this.colors, icon: 'mdi-palette', reference: 'colors' }
      ]
    }
  },
  methods: {
    push(object) {
      this.$store.dispatch('push', object)
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  display: flex
  flex-flow: column nowrap
  align-items: center

.flow
  overflow-y: auto
</style>
