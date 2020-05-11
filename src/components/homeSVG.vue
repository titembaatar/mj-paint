<template>
  <svg viewBox="0 0 500 500">
    <BasePocketSvg :stitch="stitch" :sp="sp" />
    <BasePath
      v-for="layer in layers"
      :key="layer.id"
      :id="layer.id"
      :fill="layer.color"
      :path="layer.pattern"
      :icsp="layer.icsp"
    />
  </svg>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    layers: {
      type: Array,
      required: true
    },
    stitch: {
      type: Boolean,
      required: true
    },
    sp: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      pockets: state => state.active.pockets
    })
  }
}
</script>

<style lang="sass">
svg
  max-height: calc( 100vh - 256px )
</style>
