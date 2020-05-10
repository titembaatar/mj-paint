<template>
  <svg viewBox="0 0 500 500">
    <BasePocketSvg :stitch="false" :sp="false" />
    <BasePath
      v-for="layer in pockets[0].layers"
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
  computed: {
    ...mapState({
      pockets: state => state.active.pockets
    })
  }
}
</script>

<style lang="sass" scoped></style>
